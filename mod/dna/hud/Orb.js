let id = 0

const DISABLED = 0
const IDLE     = 1
const UP       = 2
const DOWN     = 3

const DOWN_SHIFT = 2

const RED    = 1
const GREEN  = 2
const YELLOW = 3
const PINK   = 4

class Orb {

    constructor(st) {
        augment(this, {
            name: 'orb' + (++id),
            type: RED,
            x:    0,
            y:    0,
            w:    15,
            h:    15,

            state: IDLE,

            _centered: false,
        }, st)
    }

    onMouseDown() {
        this.toggled = true
        this.state = DOWN
    }

    onMouseUp() {
        this.toggled = false
        this.state = IDLE
    }

    onMouseMove() {}

    onMouseDrag() {}

    onMouseEnter() {}

    onMouseExit() {
        this.toggled = false
        this.state = IDLE
    }

    onMouseRelease() {
    }

    onClick() {}

    draw() {
        const { x, y, w, h, type, state } = this
        let sh = 0

        let img, rs
        switch(type) {
            case RED:    rs = res.hud.orb.red;    break;
            case GREEN:  rs = res.hud.orb.green;  break;
            case YELLOW: rs = res.hud.orb.yellow; break;
            case PINK:   rs = res.hud.orb.pink;   break;
        }
        switch(state) {
            case DISABLED: img = res.hud.orb.disabled; break;
            case IDLE:     img = this._hover? rs.up : rs.idle; break;
            case UP:       img = rs.up; break;
            case DOWN:     img = rs.down; sh = DOWN_SHIFT; break;
        }

        image( img, x + sh, y + sh, w - 2*sh, h - 2*sh)
    }

}
Orb.RED    = RED
Orb.GREEN  = GREEN
Orb.YELLOW = YELLOW
Orb.PINK   = PINK
