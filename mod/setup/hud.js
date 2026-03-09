function hud() {
    const _ = lab.port.hud
    _.expand()
    const W = _.w
    const CX = .5 * W

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

    const level1 = _.spawn('GLevel', {
        x: 10,
        y: 0,
        w: 25,
        h: 100,

        hint: 'herbs stash', 

        adjust: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - edge - 40
        }
    })

    const level2 = _.spawn('GLevel', {
        x: 40,
        y: 0,
        w: 25,
        h: 100,

        hint: 'herbs stash', 

        adjust: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - edge - 20
        }
    })

    
    // =============
    // === Tanks ===
    // =============
    const TW = 60

    // === Navigator ===
    const tank1 = _.spawn('Tank', {
        x: CX - 2 * TW,
        y: 0,

        hint: 'navigator',

        adjust: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - 45 - edge
            this.orb.x = this.x + .5 * this.w - .5 * this.orb.w
            this.orb.y = this.y + this.h
        }
    })
    const orb1 = _.spawn('Orb', {
        Z: 101,
        x: 0,
        y: 0,

        hint: 'burn uppers',

        onClick: function() {
            console.dir(this.tank)
        },
    })
    tank1.bindOrb(orb1)
    tank1.spawn('Alien', {
        species: 'purpleDJ',
    })


    // === Science Officer ===
    const tank2 = _.spawn('Tank', {
        x: CX - .5 * TW,
        y: 0,

        hint: 'science officer',

        adjust: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - 30 - edge
            this.orb.x = this.x + .5 * this.w - .5 * this.orb.w
            this.orb.y = this.y + this.h
        }
    })
    const orb2 = _.spawn('Orb', {
        Z: 101,
        x: 0,
        y: 0,

        hint: 'burn uppers',

        onClick: function() {
            console.dir(this.tank)
        },
    })
    tank2.bindOrb(orb2)
    tank2.spawn('Alien', {
        species: 'blueDJ',
    })


    // === Engineer ===
    const tank3 = _.spawn('Tank', {
        x: CX + 1 * TW,
        y: 0,

        hint: 'engineer',

        adjust: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - 45 - edge
            this.orb.x = this.x + .5 * this.w - .5 * this.orb.w
            this.orb.y = this.y + this.h
        }
    })
    const orb3 = _.spawn('Orb', {
        Z: 101,
        x: 0,
        y: 0,

        hint: 'burn uppers',

        onClick: function() {
            console.dir(this.tank)
        },
    })
    tank3.bindOrb(orb3)
    tank3.spawn('Alien', {
        species: 'greenGoblin',
    })

    // === Guest ===
    const tank4 = _.spawn('Tank', {
        x: CX + 3.5 * TW,
        y: 0,

        hint: 'guest',

        adjust: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - 20 - edge
            this.orb.x = this.x + .5 * this.w - .5 * this.orb.w
            this.orb.y = this.y + this.h
        }
    })
    const orb4 = _.spawn('Orb', {
        Z: 101,
        x: 0,
        y: 0,

        hint: 'burn uppers',

        onClick: function() {
            console.dir(this.tank)
        },
    })
    tank4.bindOrb(orb4)
    tank4.spawn('Alien', {
        species: 'yellowMushroom',
    })
    /*
    // === credits ===
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
    */

    _.adjust()
}
hud.Z = 21
