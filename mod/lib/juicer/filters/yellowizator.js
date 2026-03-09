function yellowizator(outc, _, x, y) {
    const r = outc[0],
          g = outc[1],
          b = outc[2]

    outc[0] = r * 0.793 + g * 0.669 + b * 0.689
    outc[1] = r * 0.749 + g * 0.786 + b * 0.768
    outc[2] = r * 0.072 + g * 0.034 + b * 0.031
}
