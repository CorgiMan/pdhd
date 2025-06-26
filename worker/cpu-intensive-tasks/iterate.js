export function run(deps, { until }) {
    let result = 0
    for (let i = 0; i < until; i++) {
        result += i
    }
    return result
}
