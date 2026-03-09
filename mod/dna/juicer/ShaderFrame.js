// @deprecated 
function clearShader(outc, _, x, y, X, Y) {
    rgba(outc, 0, 0, 0, 1)
}

class ShaderFrame {

    constructor(st) {
        augment(this, {
            x: 0,
            y: 0,
            w: 320,
            h: 200,

            W: 160,
            H: 100,

            _centered: false,
        }, st)

        this.canvas = lib.util.createCanvas(this.W, this.H)
        this.buf = this.canvas.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)

        this.render()
    }

    adjust() {
        this.x = .5 * (ctx.width  - this.w)
        this.y = .5 * (ctx.height - this.h)
    }

    fragment(outc, _, x, y, X, Y) {
        _.rgb(outc, rnd(), rnd(), rnd())
    }

    render(fragment) {
        fragment = fragment || this.fragment

        const buf  = this.buf,
              data = buf.data,
              W    = buf.width,
              H    = buf.height,
              HS   = 1 / W,
              VS   = 1 / H,
              HA   = W / H,
              VA   = H / W,
              CF   = 1 / 255

        const outc     = [0, 0, 0, 0],
              feedback = [0, 0, 0, 0],
              ctx = {
                  W,
                  H,
                  hStep:   HS,
                  vStep:   VS,
                  hAspect: HA,
                  vAspect: VA,

                  feedback,

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
              }

        function shade(curFragment) {
            if (!isFun(curFragment)) throw new Error(`JShader function is expected!`)

            if (curFragment.uniforms) {
                Object.keys(curFragment.uniforms).forEach(k => {
                    const uniform = curFragment.uniforms[k]
                    ctx[k] = uniform.val ?? uniform.def ?? 0
                })
            }

            for (let y = 0; y < H; y++) {
                for (let x = 0; x < W; x++) {
                    const offset = (y * W + x) * 4

                    outc[0] = 0
                    outc[1] = 0
                    outc[2] = 0
                    outc[3] = 1
                    feedback[0] = data[offset    ] * CF
                    feedback[1] = data[offset + 1] * CF
                    feedback[2] = data[offset + 2] * CF
                    feedback[3] = data[offset + 3] * CF

                    curFragment(outc, ctx, x * HS, y * VS, x, y)

                    data[offset    ] = floor(clamp(outc[0], 0, 1) * 255)
                    data[offset + 1] = floor(clamp(outc[1], 0, 1) * 255)
                    data[offset + 2] = floor(clamp(outc[2], 0, 1) * 255)
                    data[offset + 3] = floor(clamp(outc[3], 0, 1) * 255)
                }
            }
        }

        if (isArray(fragment)) {
            for (let i = 0; i < fragment.length; i++) {
                const curFragment = fragment[i]
                shade(curFragment)
            }
        } else {
            shade(fragment)
        }

        this.canvas.ctx.putImageData(buf, 0, 0)
    }

    evo(dt) {
        this.adjust()
    }

    draw() {
        const { canvas, x, y, w, h } = this
        blocky()
        image(canvas, x, y, w, h)
    }

    setFragment(fragment) {
        this.render( clearShader )
        this.fragment = fragment
        this.render()
    }

    getFragment() {
        return this.fragment
    }
}
