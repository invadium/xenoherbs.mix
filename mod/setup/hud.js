function hud() {
    const _ = lab.port.hud

    // space
    const starfield = _.spawn('Starfield', {
        Z: 1,
    })
    pin.link(starfield)
    const planet = _.spawn('Planet', {
        Z: 2,
    })
    pin.link(planet)

    _.spawn('XenoPanel', {
        Z: 21,
        x: 0,
        y: 0,
        w: 640,
        h: 480,

        hidden: true,

        adjust: function() {
            const vw = lab.port.view
            this.y = .5 * (vw.h - this.h)
        }
    })

    _.spawn('GLevel', {
        x: 20,
        y: 0,
        w: 35,
        h: 120,

        hint: 'herbs stash', 

        adjust: function() {
            this.y = _.h - 200
        }
    })

    const tank1 = _.spawn('Tank', {
        x: 120,
        y: 0,

        hint: 'navigator',

        adjust: function() {
            this.y = _.h - 200
            this.orb.x = this.x + .5 * this.w - .5 * this.orb.w
            this.orb.y = this.y + this.h + 20
        }
    })
    const orb1 = _.spawn('Orb', {
        Z: 101,
        x: 0,
        y: 0,
        w: 20,
        h: 20,

        hint: 'burn uppers',

        onClick: function() {
            console.dir(this.tank)
        },
    })
    tank1.bindOrb(orb1)
    tank1.spawn('Alien', {
        species: 'purpleDJ',
    })

    _.spawn('Orb', {
        Z: 101,
        x: 40,
        y: 40,
        w: 20,
        h: 20,

        onClick: function() {
            trap('state/credits')
        },
    })

    const tank2 = _.spawn('Tank', {
        x: 420,
        y: 0,

        hint: 'engineer',

        adjust: function() {
            this.y = _.h - 200
            this.orb.x = this.x + .5 * this.w - .5 * this.orb.w
            this.orb.y = this.y + this.h + 20
        }
    })
    const orb2 = _.spawn('Orb', {
        Z: 101,
        x: 0,
        y: 0,
        w: 20,
        h: 20,

        hint: 'burn uppers',

        onClick: function() {
            console.dir(this.tank)
        },
    })
    tank2.bindOrb(orb2)
    tank2.spawn('Alien', {
        species: 'greenGoblin',
    })

    _.adjust()
}
hud.Z = 21
