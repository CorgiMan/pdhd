import { assert } from 'jsr:@std/assert'

export class FeatureFlags {
    async setup({ listen, fetch, set }) {
        listen((name, value) => {
            this.flags[name] = value
        }).catch(console.error)

        this.flags = await fetch()
        this.set = set

        return this
    }

    get(name) {
        assert(name in this.flags, `Feature flag ${name} not found`)
        return this.flags[name]
    }
}
