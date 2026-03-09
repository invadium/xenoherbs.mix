const PW = 100

const GREEN  = 1
const YELLOW = 2
const PINK   = 3

class PuffPod {

    constructor(st) {
        augment(this, {
            Z:     -1, 
            name:  'puffs',
            puffs:  [],

            puffFQ: 3.5,
        }, st)
    }

    repuff(puff, type) {
        puff.at = env.time
        puff.x  = rnd()
        puff.y  = 1
        puff.s  = .02 + .05 * rnd()
        puff.t  = type || GREEN
    }

    puff() {
        const puffs = this.puffs

        for (let i = puffs.length - 1; i >= 0; i--) {
            const p = puffs[i]
            if (p.at < 0) return this.repuff(p, math.rndi(3) + 1)
        }

        const p = {}
        this.puffs.push(p)
        this.repuff(p, math.rndi(3) + 1)
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
            const sx = p.x * (w + 2*PW)
            const ry = (1 - (t * p.s))
            const sy = ry * (h + 2*PW) - PW

            let vape
            switch(p.t) {
                case GREEN:  vape = res.vape.green._ls;  break;
                case YELLOW: vape = res.vape.yellow._ls; break;
                case PINK:   vape = res.vape.pink._ls;   break;
            }
            const icell = ((t * 15) | 0) % vape.length

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
