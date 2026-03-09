function processImage(img, jshader) {

    const juicer = new dna.juicer.Core({
        w: img.width,
        h: img.height,
    })

    const pipeline = new dna.juicer.Pipeline({
        name: 'pinkSlime',

        init: function() {
            this.bindChannel(img, 1)
            this.attachShader(
                chain(lib.juicer.plainImage, lib.juicer.filters.yellowizator), {
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

function resources() {

    const smoke = res.fx.smoke
    const puff = res.fx.touch('puff')

    smoke.forEach(img => {
        const newImg = processImage(img, lib.juicer.filter.sepia)
        if (newImg) {
            puff.attach(newImg)
        }
    })

    res.alien._ls.forEach((e, i) => {
        e.id = i
    })
}
resources.Z = 3
