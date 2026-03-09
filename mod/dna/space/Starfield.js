class Starfield {

    constructor(st) {
        augment(this, {
            name: 'starfield',
            x:     0,
            y:     0,
            w:     1,
            h:     1,

            zspeed: .1,
            stars:  [],

            _ignorable: true,
        }, st)
    }

    init() {
        this.adjust()

        for (let i = 0; i < 1024; i++) {
            const star = this.spawn()
            star.z = lib.source.stars.rnd()
        }
    }

    adjust() {
        const __ = this.__
        this.x = 0
        this.y = 0
        this.w = __.w
        this.h = __.h
    }

    respawn(star) {
        star.x = 2 * lib.source.stars.rnd() - 1
        star.y = 2 * lib.source.stars.rnd() - 1
        star.d = length(star.x, star.y)
        star.z = 1
        star.r = .25 + 2 * lib.source.stars.rnd()

        return star
    }

    spawn() {
        const stars = this.stars

        // find an existing candidate
        for (let i = stars.length - 1; i >= 0; i--) {
            const star = stars[i]
            if (star.z <= 0) return this.respawn(star)
        }

        // create new star
        const star = {}
        stars.push(star)
        return this.respawn(star)
    }

    evo(dt) {
        const stars = this.stars

        for (let i = stars.length - 1; i >= 0; i--) {
            const star = stars[i]
            const dz = (1.42 - star.d) * this.zspeed
            star.z -= dz * dt
            star.dz = dz
            if (star.z <= -100) {
                this.respawn(star)
            }
        }
    }

    draw() {
        const { x, y, w, h, stars } = this
        const W = .5 * w
        const H = .5 * h

        save()
        translate(x + W, y + H)
        ctx.lineCap = 'round'

        const color = '#eecfee'
        for (let i = stars.length - 1; i >= 0; i--) {
            const star = stars[i]
            if (star.z > -100) {
                const sz = star.z <= 0? 0.0001 : star.z
                const sx = star.x/sz * W
                const sy = star.y/sz * H
                const size = (1 - sz) * star.r;

                let px = sx
                let py = sy
                const dz = star.dz * .2
                if (dz > .1) {
                    const pz = star.z + sz
                    if (pz > 0) {
                        px = star.x/(star.z + dz) * W
                        py = star.y/(star.z + dz) * H

                        stroke(color)
                        lineWidth(2 * size)
                        if (isNaN(px) || isNaN(py) || isNaN(sx) || isNaN(sy)) debugger
                        line(px, py, sx, sy)
                    } else {
                        star.z = -101
                    }
                }

                if (px - size < -W || px + size > W || py - size < -H || py + size > H) {
                    star.z = -101
                } else {
                    fill(color)
                    circle(sx, sy, size)
                }
            }
        }

        restore()
    }

}
