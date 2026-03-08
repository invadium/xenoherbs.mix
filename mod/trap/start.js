function start() {
    if (env.config.warp) {
        trap('newGame')
    } else {
        trap('state/title')
    }
}
