function plainImage(outc, _, x, y) {
    const c = _.sample(_.source ?? 1, .5 * (x + 1), .5 * (y + 1))
    _.rgba(outc, c[0], c[1], c[2], c[3])
}
