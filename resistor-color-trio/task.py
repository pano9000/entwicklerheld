color_bands = {
    "black":    0,
    "brown":    1,
    "red":      2,
    "orange":   3,
    "yellow":   4,
    "green":    5,
    "blue":     6,
    "violet":   7,
    "grey":     8,
    "white":    9
}

si_units = [
    "ohms",
    "kiloohms",
    "megaohms",
    "gigaohms",
]

def label(colors):
    basevalue = int(f"{color_bands[colors[0]]}{color_bands[colors[1]]}")
    multiplier = 10 ** color_bands[colors[2]]
    return formatvalue(basevalue, multiplier)

def formatvalue(basevalue, multiplier):
    value = basevalue * multiplier
    for unit in si_units:
        if value < 1000:
            return f"{int(value)} {unit}"
        value /= 1000.0
    return f"{value}"