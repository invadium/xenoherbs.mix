class XenoPort extends sys.LabFrame {

    constructor(st) {
        super( augment({
            name: 'port',
            x:     0,
            y:     0,

            view: {
                x:  0,
                y:  0,
                w:  640,
                h:  480,
            },
        }, st) )
    }

    init() {
        this.adjust()
    }

    adjust() {
        this.x = 0
        this.y = 0
        this.w = ctx.width
        this.h = ctx.height
        this.aspect = this.w / this.h
        this.view.zoom = this.w / this.view.w
        this.view.h = this.h / this.view.zoom
        this.view.aspect = this.view.w / this.view.h

        env.status = 'view: ' + this.view.w + ':' + this.view.h
    }

    onResize() {
        this.adjust()
    }

    draw() {
        const { x, y, view } = this

        save()
        translate(x, y)
        scale(view.zoom)

        super.draw()

        restore()
    }
}
