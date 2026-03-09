let id = 0

class Alien {

    constructor(st) {
        augment(this, {
            name: 'alien' + (++id),
            type: 0,
        }, st)
    }

    draw() {
        const { w, h } = this.__
        const photo = res.alien._ls[this.type],
              aspect = photo.width / photo.height,
              PW = w,
              PH = w * aspect

        sprite(photo, .5 * w, .5 * h, PW, PH)
    }
}
