let id = 0

class Alien {

    constructor(st) {
        augment(this, {
            name: 'alien' + (++id),
            type: -1,
            x:     0,
            y:     10,
        }, st)

        if (this.species) this.matchSpecies(this.species)
        else if (this.type < 0) this.selectRandomType()
    }

    selectRandomType() {
        this.type = math.rndi(res.alien._ls.length)
    }

    matchSpecies(species) {
        const photo = res.alien[species]
        if (photo) this.type = photo.id
    }

    draw() {
        const { x, y } = this
        const { w, h } = this.__
        const photo = res.alien._ls[this.type],
              aspect = photo.width / photo.height,
              PW = w,
              PH = w / aspect

        sprite(photo, x + .5 * w, y + .5 * h, PW, PH)
    }
}
