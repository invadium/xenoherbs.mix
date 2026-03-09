let id = 0

class Tank extends LabFrame {

    constructor(st) {
        super( augment({
            name: 'tank' + (++id),
            x:     0,
            y:     0,
            w:     60,
            h:     80,

            _centered: false,
        }, st) )
    }

    init() {
        this.spawn('PuffPod')
    }

    adjust() {}

    bindLeftOrb(orb) {
        this.leftOrb = orb
        orb.tank = this
        this.adjust()
    }

    bindRightOrb(orb) {
        this.rightOrb = orb
        orb.tank = this
        this.adjust()
    }

    draw() {
        const { x, y, w, h } = this

        save()
        translate(x, y)

        ctx.roundRect(0, 0, w, h, 3)
        ctx.clip()

        super.draw()

        lineWidth(4)
        stroke(.61, .15, .6)
        ctx.roundRect(0, 0, w, h, 3)
        ctx.stroke()

        restore()
    }

}
