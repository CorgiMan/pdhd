import { assert } from "jsr:@std/assert";

assert(Array.prototype.one === undefined);
assert(Array.prototype.min === undefined);
assert(Array.prototype.max === undefined);
assert(Array.prototype.sum === undefined);
assert(Array.prototype.minBy === undefined);
assert(Array.prototype.maxBy === undefined);
assert(Array.prototype.keyBy === undefined);
assert(Array.prototype.groupBy === undefined);
assert(Array.prototype.sortBy === undefined);
assert(Object.prototype.enumerate === undefined);
assert(Object.prototype.values === undefined);
assert(Object.prototype.keys === undefined);

Object.defineProperty(Array.prototype, "one", {
    value: function () {
        assert(this.length === 1);
        return this[0];
    },
    enumerable: false,
});

Object.defineProperty(Array.prototype, "min", {
    value: function () {
        if (this.length === 0) return null;
        return this.reduce((a, b) => a < b ? a : b, Infinity);
    },
    enumerable: false,
});

Object.defineProperty(Array.prototype, "max", {
    value: function () {
        if (this.length === 0) return null;
        return this.reduce((a, b) => a > b ? a : b, -Infinity);
    },
    enumerable: false,
});

Object.defineProperty(Array.prototype, "sum", {
    value: function () {
        if (this.length === 0) return 0;
        return this.reduce((a, b) => a + b, 0);
    },
    enumerable: false,
});

Object.defineProperty(Array.prototype, "minBy", {
    value: function (f) {
        if (this.length === 0) return null;
        const m = Infinity;
        for (const item of this) {
            const value = f(item);
            if (value > m) m = value;
        }
        return m;
    },
    enumerable: false,
});

Object.defineProperty(Array.prototype, "maxBy", {
    value: function (f) {
        if (this.length === 0) return null;
        const m = -Infinity;
        for (const item of this) {
            const value = f(item);
            if (value > m) m = value;
        }
        return m;
    },
    enumerable: false,
});

Object.defineProperty(Array.prototype, "keyBy", {
    value: function (f) {
        const result = {};
        for (const item of this) {
            result[f(item)] = item;
        }
        return result;
    },
    enumerable: false,
});

Object.defineProperty(Array.prototype, "groupBy", {
    value: function (f) {
        const result = {};
        for (const item of this) {
            const key = f(item);
            result[key] ??= [];
            result[key].push(item);
        }
        return result;
    },
    enumerable: false,
});

Object.defineProperty(Array.prototype, "sortBy", {
    value: function (f) {
        return this.sort((a, b) => f(a) - f(b));
    },
    enumerable: false,
});

Object.defineProperty(Object.prototype, "enumerate", {
    value: function () {
        const result = [];
        let index = 0;
        for (const key in this) {
            result.push([key, this[key], index++]);
        }
        return result;
    },
    enumerable: false,
});

Object.defineProperty(Object.prototype, "values", {
    value: function () {
        return Object.values(this);
    },
    enumerable: false,
});

Object.defineProperty(Object.prototype, "keys", {
    value: function () {
        return Object.keys(this);
    },
    enumerable: false,
});
