const _hud = {
    DNA:  'hud/Hud',
    name: 'hud',

    lx: function(x) {
        return this.__.lx(x)
    },
    ly: function(y) {
        return this.__.ly(y)
    },

    expand: function() {
        const view = this.__.view
        this.x = 0
        this.h = 0
        this.w = view.w
        this.h = view.h
    },
}
