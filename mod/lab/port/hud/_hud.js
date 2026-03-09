const _hud = {
    DNA:  'hud/Hud',
    name: 'hud',

    lx: function(x) {
        return this.__.lx(x)
    },
    ly: function(y) {
        return this.__.ly(y)
    },

    LX: function(x) {
        return x - this.x
    },
    LY: function(y) {
        return y - this.y
    },

    expand: function() {
        const view = this.__.view
        this.x = 0
        this.h = 0
        this.w = view.w
        this.h = view.h
    },

    pick: function(x, y, list, opt) {
        let lx = this.LX(x)
        let ly = this.LY(y)

        const ls = isArr(list)? list : null
        const fn = isFun(opt)? opt : (isFun(list)? list : null)

        let last
        for (let i = 0; i < this._ls.length; i++) {
            const node = this._ls[i]

            // probe by-convention picking procedures
            // TODO maybe have some option to allow or skip this step? Like _pickable or something...
            if (!node.hidden &&
                      ((node.within && node.within(lx, ly))
                    || (node._centered && node._circular
                        && distance(lx, ly, node.x, node.y) <= node.r)
                    || (node._centered
                        && lx >= node.x - .5 * node.w
                        && lx <= node.x + .5 * node.w
                        && ly >= node.y - .5 * node.h
                        && ly <= node.y + .5 * node.h)
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
        return last
    }

}
