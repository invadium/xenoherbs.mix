function states() {
    lab.control.state.group('bridge', [ lab.overlord, lab.port, lab.overlay, lab.monitor ])
}
states.Z = 11
