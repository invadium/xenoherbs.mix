class Framebuffer {

    constructor(st) {
        augment(this, {
            w:    256,
            h:    256,

            clearColor: [0, 0, 0, 1],
        }, st)

        if (this.src && lib.img.isDrawableImage(this.src)) {
            this.w = this.src.width
            this.h = this.src.height
            this.canvas = lib.util.canvasFromImage(this.src)
            this.bind()
        } else {
            this.canvas = lib.util.createCanvas(this.w, this.h)
            this.bind()
            this.clear()
        }
    }

    clear() {
        const { buf, data, clearColor } = this

        const c = clearColor.map(v => clamp(v, 0, 1) * 255)

        const N = 4 * buf.width * buf.height
        for (let i = 0; i < N; i += 4) {
            data[i    ] = c[0]
            data[i + 1] = c[1]
            data[i + 2] = c[2]
            data[i + 3] = c[3]
        }
        this.sync()
    }

    bind() {
        this.buf    = this.canvas.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this.data   = this.buf.data
    }

    sync() {
        this.canvas.ctx.putImageData(this.buf, 0, 0)
    }

    syncFrame() {
        this.sync()
        return this.canvas
    }

    getContext() {
        return this.canvas.ctx
    }

    getBuffer() {
        return this.buf
    }

    getData() {
        return this.data
    }

}
