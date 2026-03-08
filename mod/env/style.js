const style = {

    color: {
        main:  hsl(.5, .5, .5),
        title: hsl(.2, .5, .5),

        credits: {
            back:  hsl(.15, .2, .2),
            front: hsl(.35, .5, .5),
        },
    },

    font: {
        main: {
            family: 'helvetiHand',
            size:   24,
        },
        title: {
            family: 'graffitiDesiderium',
            size:   64,
        },
        credits: {
            family: 'komikab',
            size:   32,
        },
    },

}

function classifyFonts() {
    for (let id in style.font) {
        const font = style.font[id]
        font.id = id
        font.head = font.size + 'px ' + font.family
    }
}

(function setupStyles() {
    classifyFonts()
})()

