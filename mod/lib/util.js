function createCanvas(width, height, context) {
    const bcanvas = document.createElement('canvas')

    bcanvas.width  = width
    bcanvas.height = height
    bcanvas.ctx    = bcanvas.getContext(context || '2d')

    return bcanvas
}

function canvasFromImage(img, context) {
    const bcanvas  = lib.img.imgToCanvas(img)
    bcanvas.ctx    = bcanvas.getContext(context || '2d')

    return bcanvas
}

function canvasToImage(canvas) {
    const dataURL = canvas.toDataURL('image/png')
    const img = new Image()
    img.src = dataURL

    return img
}
