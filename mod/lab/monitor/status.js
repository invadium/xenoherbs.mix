function evo(dt) {
    const ls = []
    lab.port.pick(mouse.x, mouse.y, ls, n => !n._ignorable)

    env.hint = ''
    ls.forEach(e => {
        if (e.hint) env.hint = e.hint
    })

    if (!env.hint) {
        env.hint = '@' + mouse.x + ':' + mouse.y
    }
}
