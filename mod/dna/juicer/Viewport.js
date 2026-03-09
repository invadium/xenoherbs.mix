let id = 0

class Viewport {

    constructor(st) {
        augment(this, {
            name:  'viewport' + (++id),
            x:      0,
            y:      0,
            w:      256,
            h:      256,
            smooth: true,

            _centered: false,
        }, st)

        if (!this.juicer) this.juicer = new dna.juicer.Core({
            framebuffer: this.framebuffer,  // propagate the framebuffer if present
        })
        this.framebuffer = this.juicer.getFramebuffer()
    }

    adjust() {}

    firstChannel() {
        if (!this.juicer) return
        this.juicer.getPipeline().firstChannel()
    }

    nextChannel() {
        if (!this.juicer) return
        this.juicer.getPipeline().nextChannel()
    }

    prevChannel() {
        if (!this.juicer) return
        this.juicer.getPipeline().prevChannel()
    }

    evo(dt) {
        if (!this.juicer || !this.juicer.evo) return

        this.juicer.evo(dt)
    }

    drawCalibration() {
        const { x, y, w, h } = this

        save()
        translate(x, y)
        clip(0, 0, w, h)

        fill('#808080')
        rect(0, 0, w, h)

        const cx = .5 * w,
              cy = .5 * h,
              cr = .2 * h,
              lr = .4 * cr
        lineWidth(1)
        stroke('#ffffff')
        circle(cx, cy, cr)
        line(cx, cy - lr, cx, cy + lr)
        line(cx - lr, cy, cx + lr, cy)

        const bl = .15 * (h - 2 * cr)

        function strip(by) {
            let bi = 0,
                bx = 0
            while(bx < w) {
                if (bi % 2) fill('#ffffff')
                else fill('#000000')
                rect(bx, by, bl, bl)

                bi ++
                bx += bl
            }
        }
        strip(0)
        strip(h - bl)

        restore()
    }

    draw() {
        const { juicer, framebuffer, x, y, w, h } = this
        if (!juicer || !framebuffer) {
            this.drawCalibration()
            return
        }

        juicer.sync()
        this.adjust()

        const activeFramebuffer = this.juicer.getActiveFramebuffer()
        if (this.smooth) smooth()
        else blocky()
        image( activeFramebuffer.syncFrame(), x, y, w, h )
    }

    getJuicer() {
        return this.juicer
    }

    getPipeline() {
        if (!this.juicer) return
        return this.juicer.getPipeline()
    }

    getFramebuffer() {
        return this.framebuffer
    }

}
