function generateOrbs(_, tank) {
    tank.bindShip(pin.ship)

    const orb1L = _.spawn('Orb', {
        Z: 101,
        x: 0,
        y: 0,

        type: dna.hud.Orb.GREEN,
        hint: 'burn downers',

        evo(dt) {
            if (this.toggled) {
                this.tank.burnDowner(dt)
            }
        }
    })
    tank.bindLeftOrb(orb1L)
    const orb1R = _.spawn('Orb', {
        Z: 101,
        x: 0,
        y: 0,

        type: dna.hud.Orb.PINK,
        hint: 'burn uppers',

        evo(dt) {
            if (this.toggled) {
                this.tank.burnUpper(dt)
            }
        }
    })
    tank.bindRightOrb(orb1R)

    tank.adjust = function() {
        this.adjustY()

        this.leftOrb.x = this.x + .5 * this.w - 1.2 * this.leftOrb.w
        this.leftOrb.y = this.y + this.h + 5

        this.rightOrb.x = this.x + .5 * this.w + .2 * this.rightOrb.w
        this.rightOrb.y = this.y + this.h + 5
    }
}

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

    const ship = lab.port.spawn('Ship')
    pin.link(ship)

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

    const upperStash = _.spawn('GLevel', {
        name: 'upperStash',
        x: 10,
        y: 0,
        w: 25,
        h: 100,

        type: dna.hud.GLevel.UPPER,
        hint: 'uppers stash', 

        adjust: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - edge - 60
        }
    })
    ship.link(upperStash)

    const downerStash = _.spawn('GLevel', {
        name: 'downerStash',
        x: 50,
        y: 0,
        w: 25,
        h: 100,

        type: dna.hud.GLevel.DOWNER,
        hint: 'downers stash', 

        adjust: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - edge - 30
        }
    })
    ship.link(downerStash)

    
    // =============
    // === Tanks ===
    // =============
    const TW = 60

    // === Navigator ===
    const tank1 = _.spawn('Tank', {
        x: CX - 2 * TW,
        y: 0,

        hint: 'navigator',

        adjustY: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - 45 - edge
        }
    })
    generateOrbs(_, tank1)
    tank1.spawn('Alien', {
        species: 'purpleDJ',
    })


    // === Science Officer ===
    const tank2 = _.spawn('Tank', {
        x: CX - .5 * TW,
        y: 0,

        hint: 'science officer',

        adjustY: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - 30 - edge
        },
    })
    generateOrbs(_, tank2)
    tank2.spawn('Alien', {
        species: 'blueDJ',
    })


    // === Engineer ===
    const tank3 = _.spawn('Tank', {
        x: CX + 1 * TW,
        y: 0,

        hint: 'engineer',

        adjustY: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - 45 - edge
        }
    })
    generateOrbs(_, tank3)
    tank3.spawn('Alien', {
        species: 'greenGoblin',
    })

    // === Guest ===
    const tank4 = _.spawn('Tank', {
        x: CX + 3.5 * TW,
        y: 0,

        hint: 'guest',

        adjustY: function() {
            const edge = lab.port.lx(45)
            this.y = _.h - this.h - 20 - edge
        }

    })
    generateOrbs(_, tank4)
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
