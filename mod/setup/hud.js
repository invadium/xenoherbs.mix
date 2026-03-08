function hud() {
    const _ = lab.port.hud

    _.spawn('Orb', {
        x: 0,
        y: 0,

        onClick: function() {
            trap('state/credits')
        },
    })
}
hud.Z = 21
