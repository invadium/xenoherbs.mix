function neutralizator(outc, _, x, y) {
    const r = outc[0],
          g = outc[1],
          b = outc[2]

    outc[0] = r * 0.593 + g * 0.569 + b * 0.589
    outc[1] = r * 0.649 + g * 0.686 + b * 0.668
    outc[2] = r * 0.872 + g * 0.834 + b * 0.831
}
