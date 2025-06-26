import { assert } from 'jsr:@std/assert'

assert(Array.prototype.one === undefined)
Object.defineProperty(Array.prototype, 'one', {
    value: function () {
        assert(this.length === 1)
        return this[0]
    },
    enumerable: false,
})

assert(Array.prototype.sum === undefined)
Object.defineProperty(Array.prototype, 'sum', {
    value: function (f = (item) => item) {
        if (this.length === 0) return 0
        return this.reduce((a, b) => a + b, 0)
    },
    enumerable: false,
})

assert(Array.prototype.min === undefined)
Object.defineProperty(Array.prototype, 'min', {
    value: function (f = (item) => item) {
        if (this.length === 0) return null
        let m = Infinity
        for (const item of this) {
            const value = f(item)
            if (value < m) m = value
        }
        return m
    },
    enumerable: false,
})

assert(Array.prototype.max === undefined)
Object.defineProperty(Array.prototype, 'max', {
    value: function (f = (item) => item) {
        if (this.length === 0) return null
        let m = -Infinity
        for (const item of this) {
            const value = f(item)
            if (value > m) m = value
        }
        return m
    },
    enumerable: false,
})

assert(Array.prototype.minIndex === undefined)
Object.defineProperty(Array.prototype, 'minIndex', {
    value: function (f = (item) => item) {
        if (this.length === 0) return null
        let ix = 0
        let m = Infinity
        for (let i = 0; i < this.length; i++) {
            const value = f(this[i])
            if (value < m) {
                m = value
                ix = i
            }
        }
        return ix
    },
    enumerable: false,
})

assert(Array.prototype.maxIndex === undefined)
Object.defineProperty(Array.prototype, 'maxIndex', {
    value: function (f = (item) => item) {
        if (this.length === 0) return null
        let ix = 0
        let m = -Infinity
        for (let i = 0; i < this.length; i++) {
            const value = f(this[i])
            if (value > m) {
                m = value
                ix = i
            }
        }
        return ix
    },
    enumerable: false,
})

assert(Array.prototype.toObject === undefined)
Object.defineProperty(Array.prototype, 'toObject', {
    value: function () {
        const result = {}
        for (const [k, v] of this) {
            result[k] = v
        }
        return result
    },
    enumerable: false,
})

assert(Array.prototype.key === undefined)
Object.defineProperty(Array.prototype, 'key', {
    value: function (keyFunc, valueFunc = (item) => item) {
        if (typeof keyFunc === 'string') {
            const key = keyFunc
            keyFunc = (item) => item[key]
        }
        assert(typeof keyFunc === 'function')
        if (typeof valueFunc === 'string') {
            const key = valueFunc
            valueFunc = (item) => item[key]
        }
        assert(!keyFunc || typeof keyFunc === 'function')
        assert(!valueFunc || typeof valueFunc === 'function')

        const result = {}
        for (const item of this) {
            result[keyFunc(item)] = valueFunc ? valueFunc(item) : item
        }
        return result
    },
    enumerable: false,
})

assert(Array.prototype.group === undefined)
Object.defineProperty(Array.prototype, 'group', {
    value: function(keyFunc, valueFunc, groupFunc) {
        if (typeof keyFunc === 'string') {
            const key = keyFunc
            keyFunc = (item) => item[key]
        }
        if (typeof valueFunc === 'string') {
            const key = valueFunc
            valueFunc = (item) => item[key]
        }
        assert(!keyFunc || typeof keyFunc === 'function')
        assert(!valueFunc || typeof valueFunc === 'function')
        assert(!groupFunc || typeof groupFunc === 'function')
        const result = {}
        for (const item of this) {
            const key = keyFunc ? keyFunc(item) : item
            result[key] ??= []
            result[key].push(valueFunc ? valueFunc(item) : item)
        }
        for(const key in result) {
            result[key] = groupFunc ? groupFunc(result[key]) : result[key]
        }
        return result
    },
    enumerable: false,
})

assert(Array.prototype.sortBy === undefined)
Object.defineProperty(Array.prototype, 'sortBy', {
    value: function (f) {
        return this.sort((a, b) => f(a) - f(b))
    },
    enumerable: false,
})

assert(Array.prototype.$json === undefined)
Object.defineProperty(Array.prototype, '$json', {
    value: function () {
        return JSON.stringify(this, null, 2)
    },
    enumerable: false,
})

assert(Object.prototype.$pick === undefined)
Object.defineProperty(Object.prototype, '$pick', {
    value: function (...keys) {
        const result = {}
        for (const key of keys) {
            result[key] = this[key]
        }
        return result
    },
    enumerable: false,
})

assert(Object.prototype.$length === undefined)
Object.defineProperty(Object.prototype, '$length', {
    value: function () {
        return Object.keys(this).length
    },
    enumerable: false,
})

assert(Object.prototype.$entries === undefined)
Object.defineProperty(Object.prototype, '$entries', {
    value: function () {
        const entries = []
        let index = 0
        for (const key in this) {
            entries.push([key, this[key], index++])
        }
        return entries
    },
    enumerable: false,
})

assert(Object.prototype.$values === undefined)
Object.defineProperty(Object.prototype, '$values', {
    value: function () {
        return Object.values(this)
    },
    enumerable: false,
})

assert(Object.prototype.$keys === undefined)
Object.defineProperty(Object.prototype, '$keys', {
    value: function () {
        return Object.keys(this)
    },
    enumerable: false,
})

assert(Object.prototype.$map === undefined)
Object.defineProperty(Object.prototype, '$map', {
    value: function (f) {
        const result = []
        for (const key in this) {
            result.push(f(key, this[key]))
        }
        return result
    },
    enumerable: false,
})

assert(Object.prototype.$mapValues === undefined)
Object.defineProperty(Object.prototype, '$mapValues', {
    value: function (f) {
        const result = {}
        for (const key in this) {
            result[key] = f(this[key])
        }
        return result
    },
    enumerable: false,
})

assert(Object.prototype.$json === undefined)
Object.defineProperty(Object.prototype, '$json', {
    value: function () {
        return JSON.stringify(this, null, 2)
    },
    enumerable: false,
})
