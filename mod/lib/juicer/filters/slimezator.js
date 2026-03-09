function slimezator(outc, _, x, y) {
    const r = outc[0],
          g = outc[1],
          b = outc[2]

    //outc[0] = r * 0.393 + g * 0.769 + b * 0.189
    //outc[1] = r * 0.349 + g * 0.686 + b * 0.168
    //outc[2] = r * 0.272 + g * 0.534 + b * 0.131
    outc[0] = r * 0.193 + g * 0.169 + b * 0.189
    outc[1] = r * 0.649 + g * 0.686 + b * 0.568
    outc[2] = r * 0.172 + g * 0.134 + b * 0.131
}
