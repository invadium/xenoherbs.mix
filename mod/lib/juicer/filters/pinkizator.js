function pinkizator(outc, _, x, y) {
    const r = outc[0],
          g = outc[1],
          b = outc[2]

    outc[0] = r * 0.793 + g * 0.569 + b * 0.689
    outc[1] = r * 0.049 + g * 0.086 + b * 0.068
    outc[2] = r * 0.672 + g * 0.634 + b * 0.731
}
