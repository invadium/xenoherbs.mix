function mix(rv, v1, v2, val) {
    rv[0] = v1[0] * (1 - val) + v2[0] * val
    rv[1] = v1[1] * (1 - val) + v2[1] * val
    rv[2] = v1[2] * (1 - val) + v2[2] * val

    return this
}

function imix(rv, v1, v2, val) {
    const nv = new Float32Array(3)

    nv[0] = v1[0] * (1 - val) + v2[0] * val
    nv[1] = v1[1] * (1 - val) + v2[1] * val
    nv[2] = v1[2] * (1 - val) + v2[2] * val

    return nv
}

function vrgb(r, g, b) {
    const nv = new Float32Array(3)
    nv[0] = r
    nv[1] = g
    nv[2] = b
}

extend(vrgb, {
    mix,
})
