let id = 0

class Alien {

    constructor(st) {
        augment(this, {
            name: 'alien' + (++id),
            type: 0,
            x:    0,
            y:    20,
        }, st)
    }

    draw() {
        const { x, y } = this
        const { w, h } = this.__
        const photo = res.alien._ls[this.type],
              aspect = photo.width / photo.height,
              PW = w,
              PH = w * aspect

        sprite(photo, x + .5 * w, y + .5 * h, PW, PH)
    }
}
