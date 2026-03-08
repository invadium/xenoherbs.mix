function hud() {
    const _ = lab.port.hud

    _.spawn('Orb', {
        x: 0,
        y: 0,

        onClick: function() {
            trap('state/credits')
        },
    })

    _.spawn('XenoPanel', {
        x: 0,
        y: 0,
        w: 640,
        h: 480,
    })
}
hud.Z = 21
