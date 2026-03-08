let id = 0

const DISABLED = 0
const IDLE     = 1
const UP       = 2
const DOWN     = 3

class Orb {

    constructor(st) {
        augment(this, {
            name: 'orb' + (++id),
            x:    0,
            y:    0,
            w:    40,
            h:    40,

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

    onMouseEnter() {
    }

    onMouseExit() {
        this.toggled = false
        this.state = IDLE
    }

    onClick() {
        log('clicked')
    }

    draw() {
        const { x, y, w, h, state } = this

        let img
        const rs = res.hud.orb
        switch(state) {
            case DISABLED: img = rs.disabled; break;
            case IDLE:     img = this._hover? rs.up : rs.idle; break;
            case UP:       img = rs.up;       break;
            case DOWN:     img = rs.down;     break;
        }

        image( img, x, y, w, h )
    }

}
