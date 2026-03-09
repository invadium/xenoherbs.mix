const style = {

    color: {
        main:     hsl(.22, .89, .67),
        title:    hsl(.28, .9, .7),
        subTitle: hsl(.11, .7, .7),

        credits: {
            back:  hsl(.15, .2, .2),
            front: hsl(.35, .5, .5),
        },
    },

    font: {
        main: {
            //family: 'helvetiHand',
            family: 'komikab',
            size:   24,
        },
        title: {
            family: 'graffitiDesiderium',
            size:   64,
        },
        subTitle: {
            family: 'graffitiDesiderium',
            size:   48,
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

