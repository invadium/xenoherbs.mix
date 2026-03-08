function onActivate() {
    this.startedAt = env.time
    lab.background = res.background.alienFilaments
}

function onDeactivate() {}

function next() {
    if (!this.startedAt) return

    this.startedAt = 0
    trap('state/bridge')
}

function evo(dt) {
    if (this.startedAt && env.time > this.startedAt + env.tune.title.hold) {
        this.next()
    }
}
