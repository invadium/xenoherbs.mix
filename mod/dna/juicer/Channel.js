const CF = 1 / 255

class Channel {

    constructor(st) {
        if (!st) throw new Error('channel initialization data is missing!')
        if (!isNum(st.id)) throw new Error('the channel requires a defined id!')
        if (!st.src) throw new Error('the channel requires a defined image or framebuffer source!')

        augment(this, {
            name: 'channel' + st.id,
        }, st)

        if (this.src instanceof dna.juicer.Framebuffer) {
            this.framebuffer = this.src
            this.buf         = this.framebuffer.getBuffer()
        } else if (lib.img.isDrawableImage(this.src)) {
            this.framebuffer = new dna.juicer.Framebuffer({
                src: this.src,
            })
            // this.buf  = lib.img.imgData(this.src)
            this.buf         = this.framebuffer.getBuffer()
        } else {
            // channel out of an empty framebuffer?
        }
        this.data = this.buf.data
        this.data.__ = this
        this.data.id = this.id
        this.buf.__ = this
        this.buf.id = this.id
        this.w = this.buf.width
        this.h = this.buf.height
    } 

    sample(outc, x, y) {
        const data = this.data
        const X = floor(x * this.w),
              Y = floor(y * this.h)
        const offset = (Y * this.w + X) * 4
              
        outc[0] = data[offset    ] * CF
        outc[1] = data[offset + 1] * CF
        outc[2] = data[offset + 2] * CF
        outc[3] = data[offset + 3] * CF
    }

    sync() {
    }

    getBuffer() {
        return this.buf
    }

    getData() {
        return this.data
    }

    getFramebuffer() {
        return this.framebuffer
    }
}
