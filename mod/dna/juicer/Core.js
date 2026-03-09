const CF = 1 / 255

class Core {

    constructor(st) {
        augment(this, {
            name: 'juicer',
            w:     400,
            h:     400,
        }, st)

        if (!this.framebuffer) this.framebuffer = new dna.juicer.Framebuffer({
            w:  this.w,
            h:  this.h,
        })
    }

    createAndBindPipeline(st) {
        const pipeline = this.pipeline = new dna.juicer.Pipeline()

        if (isFun(st)) {
            // mono-shader
            pipeline.attachShader(st)
        }
        this.bindPipeline(pipeline)

        return pipeline
    }

    bindPipeline(pipeline) {
        if (!pipeline || !(pipeline instanceof dna.juicer.Pipeline)) throw new Error('a valid juicer pipeline is expected!')
        if (this.pipeline === pipeline) return // already binded!
        if (this.pipeline) this.releasePipeline()

        if (!pipeline.core) {
            pipeline.core = this
            pipeline.bindChannel(this.getFramebuffer())
            if (isFun(pipeline.init)) pipeline.init()
        } else if (pipeline.core !== this) {
            throw new Error(`Can't bind - the pipeline already binded to a different juicer core`)
        }
        this.pipeline = pipeline
        if (isFun(this.pipeline.onBind)) this.pipeline.onBind()
    }

    releasePipeline() {
        if (!this.pipeline) return

        if (isFun(this.pipeline.onRelease)) this.pipeline.onRelease()
        this.pipeline = null
    }

    evo(dt) {
        if (!this.pipeline || !this.framebuffer || !this.pipeline.evo) return

        this.pipeline.evo(dt)
    }

    render() {
        if (!this.pipeline || !this.framebuffer) return

        const pipeline = this.pipeline
        if (isFun(pipeline.preRender)) pipeline.preRender()

        const pctx     = pipeline.getContext(),
              stages   = pipeline.getStages(),
              outc     = [0, 0, 0, 0],
              ctx = {

                  // feedback,
                  rgb: function(out, r, g, b) {
                      out[0] = r
                      out[1] = g
                      out[2] = b
                      out[3] = 1
                  },
                  rgba: function(out, r, g, b, a){
                      out[0] = r
                      out[1] = g
                      out[2] = b
                      out[3] = a
                  },
                  RGB: function(out, R, G, B) {
                      out[0] = R / 255
                      out[1] = G / 255
                      out[2] = B / 255
                      out[3] = 1
                  },
                  RGBA: function(out, R, G, B, A){
                      out[0] = R / 255
                      out[1] = G / 255
                      out[2] = B / 255
                      out[3] = A / 255
                  },

                  sample: function(id, x, y) {
                      // mirror
                      x = abs(x) % 2
                      if (x >= 1) x = 1 - (x - 1)
                      if (x === 1) x = 0
                      y = abs(y) % 2
                      if (y >= 1) y = 1 - (y - 1)
                      if (y === 1) y = 0

                      // clamp
                      //x = clamp(x, 0, 1)
                      //y = clamp(x, 0, 1)

                      // wrap sampling coordinates
                      // x = warp(x, 0, 1)
                      // y = warp(y, 0, 1)
                      const chan   = pipeline.channels[id ?? 0],
                            data   = chan.data,
                            u      = x * chan.w,
                            v      = y * chan.h,
                            fx     = u % 1,
                            fy     = v % 1,
                            X      = floor(u),
                            Y      = floor(v)

                      function sampleAt(sx, sy) {
                          const offset = 4 * ((sy % chan.h) * chan.w + (sx % chan.w))
                          return [
                              data[offset    ] * CF,
                              data[offset + 1] * CF,
                              data[offset + 2] * CF,
                              data[offset + 3] * CF,
                          ]
                      }

                      // lineary interpolation filter
                      const s1 = sampleAt(X,     Y    ),
                            s2 = sampleAt(X + 1, Y    ),
                            s3 = sampleAt(X,     Y + 1),
                            s4 = sampleAt(X + 1, Y + 1)

                          vrgba.mix(s1, s1, s2, fx)
                          vrgba.mix(s3, s3, s4, fx)
                      vrgba.mix(s1, s1, s3, fy)

                      return s1
                  },

                  add: function(rv, v1, v2) {
                      rv[0] = v1[0] + v2[0]
                      rv[1] = v1[1] + v2[1]
                      rv[2] = v1[2] + v2[2]
                      rv[3] = v1[3] + v2[3]
                  },

                  divScalar: function(rv, v1, val) {
                      rv[0] = v1[0] / val
                      rv[1] = v1[1] / val
                      rv[2] = v1[2] / val
                      rv[3] = v1[3] / val
                  },
              }
        extend(ctx, pctx)

        function renderStage(stage) {
            /*
            if (curFragment.uniforms) {
                Object.keys(curFragment.uniforms).forEach(k => {
                    const uniform = curFragment.uniforms[k]
                    ctx[k] = uniform.val ?? uniform.def ?? 0
                })
            }
            */
            const env     = stage.env,
                  jshader = stage.jshader,
                  channel = pipeline.getChannel(env.target ?? 0),
                  buf     = channel.getBuffer(),
                  data    = channel.getData()

            const feedback = (env.feedback != null)
            const fchannel = feedback? pipeline.getChannel(env.feedback) : null

            const W  = channel.w,
                  H  = channel.h,
                  HA = W / H, // horizontal aspect rate
                  VA = H / W  // vertical aspect rate
            ctx.W = W
            ctx.H = H
            ctx.hAspect = HA
            ctx.vAspect = VA
            extend(ctx, env)

            const BHS  = 1 / W,
                  BVS  = 1 / H,
                  HS   = 2 * BHS, // horizontal sampling interval
                  VS   = 2 * BVS  // vertical sampling interval
            ctx.hStep  = HS
            ctx.vStep  = VS
            ctx.bhStep = BHS
            ctx.bvStep = BVS

            if (isFun(jshader.preRender)) {
                jshader.preRender(ctx, channel)
            }
            for (let Y = 0; Y < H; Y++) {
                for (let X = 0; X < W; X++) {
                    const offset = (Y * W + X) * 4
                    if (feedback) {
                        // TODO figure out if resolution matches
                        //      and use more efficient offset access
                        //      instead of sampling
                        fchannel.sample(outc, X * BHS, Y * BVS)
                    } else {
                        outc[0] = 0
                        outc[1] = 0
                        outc[2] = 0
                        outc[3] = 1
                    }

                    jshader(outc, ctx, X * HS - 1, Y * VS - 1, X * BHS, Y * BVS, X, Y)

                    data[offset    ] = floor(clamp(outc[0], 0, 1) * 255)
                    data[offset + 1] = floor(clamp(outc[1], 0, 1) * 255)
                    data[offset + 2] = floor(clamp(outc[2], 0, 1) * 255)
                    data[offset + 3] = floor(clamp(outc[3], 0, 1) * 255)
                }
            }
        }

        for (let i = 0; i < stages.length; i++) {
            const stage = stages[i]
            if (!stage.env.disabled) {
                renderStage(stage)
            }
        }

        if (isFun(pipeline.postRender)) pipeline.postRender()
        this.framebuffer.sync()
    }

    sync() {
        // TODO re-render if necessary for the pipeline
    }

    getPipeline() {
        return this.pipeline
    }

    getFramebuffer() {
        return this.framebuffer
    }

    getActiveFramebuffer() {
        if (!this.pipeline) return this.framebuffer

        return this.pipeline.getActiveFramebuffer()
    }

}
