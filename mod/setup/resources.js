function processImage(img, filter) {

    const juicer = new dna.juicer.Core({
        w: img.width,
        h: img.height,
    })

    const pipeline = new dna.juicer.Pipeline({
        name: 'colorFilter',

        init: function() {
            this.bindChannel(img, 1)
            this.attachShader(
                chain(lib.juicer.plainImage, filter), {
                    source: 1,
                }
            )
        },
    })

    juicer.bindPipeline(pipeline)
    juicer.render()

    const fb = juicer.getFramebuffer()
    const newImg = lib.util.canvasToImage(fb.canvas)

    return newImg
}

function processBatch(target, list, filter) {
    list.forEach(img => {
        const newImg = processImage(img, filter)
        if (newImg) {
            target.attach(newImg)
        }
    })
}

function resources() {
    // precalculate vapes
    const smoke = res.fx.smoke
    const vape  = res.touch('vape')

    processBatch(vape.touch('green'), smoke, lib.juicer.filters.slimezator)
    processBatch(vape.touch('pink'), smoke, lib.juicer.filters.pinkizator)
    processBatch(vape.touch('yellow'), smoke, lib.juicer.filters.yellowizator)
    // processBatch(vape.touch('red'), smoke, lib.juicer.filters.redizator)
    // processBatch(vape.touch('neutral'), smoke, lib.juicer.filters.neutralizator)

    // index alien types
    res.alien._ls.forEach((e, i) => {
        e.id = i
    })
}
resources.Z = 3
