class XenoPort extends sys.LabFrame {

    constructor(st) {
        super( augment({
            name: 'port',
            x:     0,
            y:     0,

            view: {
                x:  0,
                y:  0,
                w:  640,
                h:  480,
            },
        }, st) )
    }

    init() {
        this.adjust()
    }

    adjust() {
        this.x = 0
        this.y = 0
        this.w = ctx.width
        this.h = ctx.height
        this.aspect = this.w / this.h
        this.view.zoom = this.w / this.view.w
        this.view.h = this.h / this.view.zoom
        this.view.aspect = this.view.w / this.view.h
        this.view.cx = .5 * this.view.w
        this.view.cy = .5 * this.view.h
    }

    onResize() {
        this.adjust()
    }

    // translate local x to the parent coordinate space
    //
    // @param {number} lx
    // @returns {number} - upper x
    ux(lx) {
        return (lx - this.view.x)*this.view.zoom + this.x
    }

    // translate local y to the parent coordinate space
    //
    // @param {number} ly
    // @returns {number} - upper y
    uy(ly) {
        return (ly - this.view.y)*this.view.zoom + this.y
    }

    // translate local 2D vector to the parent coordinate space
    //
    // @param {array/vec2} v
    // @returns {array/vec2} - transformed vector
    upos(v) {
        v[0] = (lx - this.view.x)*this.view.zoom + this.x,
        v[1] = (ly - this.view.y)*this.view.zoom + this.y
    }

    // translate parent coordinates x to the local coordinate space
    //
    // @param {number} ux
    // @returns {number} - local x
    lx(ux) {
        return (ux - this.x)/this.view.zoom + this.view.x
    }

    // translate parent coordinates y to the local coordinate space
    //
    // @param {number} uy
    // @returns {number} - local y
    ly(uy) {
        return (uy - this.y)/this.view.zoom + this.view.y
    }

    // translate parent x and y to the local coordinate space
    //
    // @param {array/vec2} v
    // @returns {array/vec2} - object with local x and y
    lpos(v) {
        v[0] = (v[0] - this.x)/this.view.zoom + this.view.x
        v[1] = (v[1] - this.y)/this.view.zoom + this.view.y
    }

    getDisplayList() {
        return this._ls
    }

    pick(x, y, list, opt) {
        // test coordinates against viewport
        if (x < this.x || x > this.x + this.w || y < this.y || y > this.y + this.h) return

        let lx
        let ly
        if (this.lx) {
            lx = this.lx(x)
            ly = this.ly(y)
        } else {
            const lpos = this.lpos([x, y])
            lx = lpos[0]
            ly = lpos[1]
        }
        const ls = isArr(list)? list : null
        const fn = isFun(opt)? opt : (isFun(list)? list : null)

        let last
        function pickFromList(sourceList) {
            for (let i = 0; i < sourceList.length; i++) {
                const node = sourceList[i]

                // probe by-convention picking procedures
                // TODO maybe have some option to allow or skip this step? Like _pickable or something...
                if (!node.hidden &&
                          ((node.within && node.within(lx, ly))
                        || (node._centered && node._circular
                            && distance(lx, ly, node.x, node.y) <= node.r)
                        || (node._centered
                            && lx >= node.x - node.w/2
                            && lx <= node.x + node.w/2
                            && ly >= node.y - node.h/2
                            && ly <= node.y + node.h/2)
                        || (node._rectangular
                            && !node._centered
                            && lx >= node.x
                            && lx <= node.x + node.w
                            && ly >= node.y
                            && ly <= node.y + node.h)
                )) {
                    if (fn) {
                        if (fn(node)) {
                            if (ls) ls.push(node)
                            last = node
                        }
                    } else {
                        if (ls) ls.push(node)
                        last = node
                    }
                }

                // try custom picking routine
                if (isFun(node.pick)) {
                    let val
                    if (fn) {
                        if (fn(node)) val = node.pick(lx, ly, ls, opt)
                    } else {
                        val = node.pick(lx, ly, ls, opt)
                    }
                    if (val) last = val
                }
            }
        }

        const sourceList = this.getDisplayList()
        pickFromList(sourceList)

        return last
    }

    draw() {
        const { x, y, view } = this

        save()
        translate(x, y)
        scale(view.zoom)
        translate(view.x, view.y)

        super.draw()

        restore()
    }
}
