function hud() {
    const _ = lab.port.hud

    // space
    _.spawn('Starfield', {
        Z: 1,
    })
    _.spawn('Planet', {
        Z: 2,
    })

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

        adjust: function() {
            this.y = _.h - 200
        }
    })

    const tank1 = _.spawn('Tank', {
        x: 120,
        y: 0,
        w: 100,
        h: 100,

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

        onClick: function() {
            console.dir(this.tank)
        },
    })
    tank1.bindOrb(orb1)

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

    _.adjust()
}
hud.Z = 21
