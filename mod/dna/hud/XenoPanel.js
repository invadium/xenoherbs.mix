let id = 0

class XenoPanel {

    constructor(st) {
        augment(this, {
            name: 'panel' + (++id),
            x:     0,
            y:     0,
            w:     100,
            h:     100,

            color: hsl(.45, .5, .5),
        }, st)
    }

    draw() {
        const { x, y, w, h, color } = this

        lineWidth(2)
        stroke(color)
        rect(x, y, w, h)
    }

}
