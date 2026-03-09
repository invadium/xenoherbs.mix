let id = 0

// configuration of rendering stages and dataflows
//
// Keeps all shaders, their associated state
// and all auxilliary buffers and data structures.
class Pipeline {

    constructor(st) {
        augment(this, {
            name:  'pipeline' + (++id),
            ctx:    {},
            def:    {},
            stages: [],

            channels:      [],
            activeChannel: 0,
        }, st)
    }

    attachShader(jshader, env) {
        if (!jshader) throw new Error('a juice shader is expected!')
        const _ = this
        _.stages.push({
            env:     env ?? {},
            jshader: jshader,
        })

        if (jshader.uniforms) {
            Object.keys(jshader.uniforms).forEach(name => {
                const df = jshader.uniforms[name]
                _.def[name] = df
                if (df.def != null) {
                    _.ctx[name] = df.def
                }
            })
        }
    }

    createChannelBuffer(w, h, id) {
        const framebuffer = this.core.getFramebuffer(),
              W = w ?? framebuffer.w,
              H = h ?? framebuffer.h

        const channelBuffer = new dna.juicer.Framebuffer({
            w:  W,
            h:  H,
        })
        this.bindChannel(channelBuffer, id)
    }

    bindChannel(src, id) {
        if (!src) throw new Error('an image or framebuffer is expected')

        const cid = id || this.channels.length
        const channel = new dna.juicer.Channel({
            id:  cid,
            src: src,
        })

        if (!id) {
            this.channels.push(channel)
        } else {
            this.channels[id] = channel
        }
    }

    firstChannel() {
        this.activeChannel = 0
    }

    prevChannel() {
        this.activeChannel = max(this.activeChannel - 1, 0)
    }

    nextChannel() {
        this.activeChannel = min(this.activeChannel + 1, this.channels.length - 1)
    }

    sync() {
        this.channels[this.activeChannel].sync()
    }

    getContext() {
        return this.ctx
    }

    getStages() {
        return this.stages
    }

    getChannel(i) {
        return this.channels[i]
    }

    getActiveChannel() {
        return this.channels[this.activeChannel]
    }

    getActiveFramebuffer() {
        const channel = this.channels[this.activeChannel] || this.channels[0]
        return channel.getFramebuffer()
    }
}
