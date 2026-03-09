function bluezator(outc, _, x, y) {
    const r = outc[0],
          g = outc[1],
          b = outc[2]

    outc[0] = r * 0.193 + g * 0.169 + b * 0.189
    outc[1] = r * 0.249 + g * 0.286 + b * 0.268
    outc[2] = r * 0.772 + g * 0.634 + b * 0.731
}
