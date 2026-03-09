class Planet {

    constructor(st) {
        augment(this, {
            name: 'planet',
            type: -1,


            rx:    0,
            ry:    0,
            z:     1,
            R:     100,

            // the screen coordinates and radius are dynamically calculated in draw()
            x:     0,
            y:     0,
            r:     1,

            hint:  'planet',
            _centered: true,
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
        const { R, z } = this
        if (z < -1 || z > 1) return

        const view = lab.port.view
        const tex = res.planets._ls[this.type]

        save()
        translate(view.cx, view.cy)

        let dx = 0,
            dy = 0,
            scale = R

        if (z >= 0) {
            scale = (1 - z) * R
        } else {
            dx = (-z) * view.w
            dy = (-z) * view.h
            scale = (-z*8 + 1) * R
        }

        this.x = view.cx + dx
        this.y = view.cy + dy
        this.r = scale
        sprite(tex, dx, dy, scale, scale)

        restore()
    }
}
