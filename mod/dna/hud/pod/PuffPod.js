const PW = 100

class PuffPod {

    constructor(st) {
        augment(this, {
            Z:     -1, 
            name:  'puffs',
            puffs:  [],

            puffFQ: 3.5,
        }, st)
    }

    repuff(puff) {
        puff.at = env.time
        puff.x  = rnd()
        puff.y  = 1
        puff.s  = .02 + .05 * rnd()
    }

    puff() {
        const puffs = this.puffs

        for (let i = puffs.length - 1; i >= 0; i--) {
            const p = puffs[i]
            if (p.at < 0) return this.repuff(p)
        }

        const p = {}
        this.puffs.push(p)
        this.repuff(p)
    }

    evo(dt) {
        if (rnd() < this.puffFQ * dt) this.puff()
    }

    draw() {
        const { x, y, w, h } = this.__
        const puffs = this.puffs

        // TODO select from the proper type
        const vape = res.vape.green._ls

        save()
        alpha(.5)

        for (let i = puffs.length - 1; i >= 0; i--) {
            const p = puffs[i]
            const t = env.time - p.at
            const icell = ((t * 15) | 0) % vape.length
            const sx = p.x * (w + 2*PW)
            const ry = (1 - (t * p.s))
            const sy = ry * (h + 2*PW) - PW

            if (ry < 0) {
                p.at = -1
            } else {
                const img = vape[icell]
                sprite( img, sx, sy, PW, PW )
            }
        }

        restore()
    }
}
