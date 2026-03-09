function mouseDown(e) {
    if (!env.debug) return

    if (e.button === 2) {
        const ls = []
        lab.port.pick(e.x, e.y, ls, n => !n._ignorable)
        if (ls.length > 1) {
            console.dir(ls)
        } else if (ls.length === 1) {
            console.dir(ls[0])
        }
    }
}
