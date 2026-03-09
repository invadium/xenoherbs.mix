const DOWNER = 1
const UPPER  = 2

class GLevel {

    constructor(st) {
        augment(this, {
            name:  'glevel',
            type:   UPPER,
            level:  0,

            x:      0,
            y:      0,
            w:      1,
            h:      1,

            MAX_LEVEL:   420,
            BURN_RATE:   10,
            REFILL_RATE: 20,

            _centered: false,
        }, st)
        this.level = this.level || this.MAX_LEVEL
    }

    capacity() {
        return (this.MAX_LEVEL - this.level)
    }

    resupply(amount) {
        const capacity = this.capacity()
        if (amount <= capacity) {
            this.level += amount
            return 0
        } else {
            this.level = this.MAX_LEVEL
            return amount - capacity
        }
    }

    consume(amount) {
        if (amount <= this.level) {
            this.level -= amount
            return 0
        } else {
            const missing = amount - this.level
            this.level = 0
            return missing
        }
    }

    contains(amount) {
        return (this.level >= amount)
    }

    burn(dt) {
        const request = this.BURN_RATE * dt
        return this.consume(request)
    }

    refill(dt) {
        const qty = this.REFILL_RATE * dt
        return this.resupply(qty)
    }

    draw() {
        const { x, y, w, h, level, MAX_LEVEL } = this

        let herbImg
        switch(this.type) {
            case DOWNER: herbImg = res.hud.level.downer; break;
            case UPPER:  herbImg = res.hud.level.upper;  break;
        }

        const v  = level / MAX_LEVEL,
              hh = v * h,
              sy = (1 - v) * herbImg.height,
              sw = herbImg.width,
              sh = herbImg.height - sy

        save()

        ctx.roundRect(x, y, w, h, 3)
        ctx.clip()

        image(herbImg, 0, sy, sw, sh, x, y + h - hh, w, hh)

        lineWidth(4)
        stroke(.61, .15, .6)
        ctx.roundRect(x, y, w, h, 3)
        ctx.stroke()

        restore()
    }

}
GLevel.DOWNER = DOWNER
GLevel.UPPER  = UPPER
