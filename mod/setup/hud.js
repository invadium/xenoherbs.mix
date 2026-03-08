function hud() {
    const _ = lab.port.hud

    _.spawn('XenoPanel', {
        x: 0,
        y: 0,
        w: 640,
        h: 480,

        adjust: function() {
            const vw = lab.port.view
            this.y = .5 * (vw.h - this.h)
        }
    })

    _.spawn('Orb', {
        x: 320,
        y: 240,
        w: 40,
        h: 40,

        onClick: function() {
            trap('state/credits')
        },
    })

    _.adjust()
}
hud.Z = 21
