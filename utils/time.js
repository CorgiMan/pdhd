const usTable = {
    us: 1,
    ms: 1e3,
    s: 1e6,
    m: 60e6,
    h: 60 * 60e6,
    d: 24 * 60 * 60e6,
    w: 7 * 24 * 60 * 60e6,
    y: 31556926e6,
}

export function seconds(str) {
    return Math.floor(us(str) / 1e6)
}

export function ms(str) {
    return Math.floor(us(str) / 1e3)
}

export function us(str) {
    let duration = 0
    for (const part of str.split(/ +/)) {
        const split = part.split(/(?<=[0-9])(?=[a-z])/)
        if (split.length === 1) split.unshift('1')
        const [num, unit] = split
        if (!num) throw new Error(`Invalid time string ${str}`)
        if (!unit || !(unit in usTable)) throw new Error(`Invalid time string ${str}`)
        const scalar = Number(num)
        if (isNaN(scalar) || !isFinite(scalar)) throw new Error(`Invalid time string ${str}`)
        duration += scalar * usTable[unit]
    }
    return duration
}
