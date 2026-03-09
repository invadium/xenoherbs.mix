class Planet {

    constructor(st) {
        augment(this, {
            type: -1,
            rx:    0,
            ry:    0,
            z:     1,
            r:     100,

            zspeed: 0.1,
        }, st)
    }

    init() {
        this.randomType()
    }

    setType(type) {
        this.type = (type | 0) % res.planets._ls.length
    }

    nextType() {
        this.setType(this.type + 1)
    }

    randomType() {
        let nextType = lib.source.cosmology.rndi(res.planets._ls)
        if (this.type === nextType) nextType ++
        this.setType(nextType)
    }

    evo(dt) {
        const zspeed = .5 * this.__.starfield.zspeed
        this.z -= zspeed * dt
        if (this.z < -1) {
            this.nextType()
            this.z = 2 + 5 * rnd()
        }
    }

    draw() {
        const { r, z } = this
        if (z < -1 || z > 1) return

        const view = lab.port.view
        const tex = res.planets._ls[this.type]

        save()
        translate(view.cx, view.cy)

        let dx = 0,
            dy = 0,
            scale = r

        if (z >= 0) {
            scale = (1 - z) * r
        } else {
            dx = (-z) * view.w
            dy = (-z) * view.h
            scale = (-z*8 + 1) * r
        }

        sprite(tex, dx, dy, scale, scale)

        restore()
    }
}
