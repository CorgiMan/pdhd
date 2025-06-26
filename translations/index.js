import { assert, assertLess, assertNotEquals } from 'jsr:@std/assert'

export class Translations {
    async setup({ translations, fetch, listen }) {
        this.translations = translations ?? {}
        
        listen((lang, oldKey, newKey, newFormatString, op) => {
            if (op === 'DELETE' || (oldKey && oldKey !== newKey)) {
                let it = this.translations[lang]
                const parts = oldKey.split('.')
                for (const [i, part] of parts.entries()) {
                    if (i < parts.length - 1) {
                        // assert(typeof it[part] !== 'string', `Translation ${key} already exists in language ${lang}`)
                        it[part] ??= {}
                        it = it[part]
                        continue
                    }
                    // assert(!it[part], `Translation ${key} already exists in language ${lang} as ${JSON.stringify(it[part])}`)
                    delete it[part]
                }
            }

            if (newKey) {
                this.updateTranslation(lang, newKey, newFormatString)
            }
        }).catch(console.error)

        this.flags = await fetch((translations) => {
            translations.forEach(({ lang, key, formatString }) => this.updateTranslation(lang, key, formatString))
        })

        for (const lang in translations) assertNotEquals(lang, 'key', `Language "key" is reserved`)

        return this
    }

    updateTranslation(lang, key, formatString) {
        assert(typeof lang === 'string', `Language not string: ${lang}`)
        assertNotEquals(lang, 'key', `Language "key" is reserved`)
        assert(typeof key === 'string', `Translation key not string: ${key}`)
        assert(typeof formatString === 'string', `Translation formatString not string: ${formatString}`)
        
        this.translations[lang] ??= {}
        let it = this.translations[lang]
        
        const parts = key.split('.')
        for (const [i, part] of parts.entries()) {
            if (i < parts.length - 1) {
                // assert(typeof it[part] !== 'string', `Translation ${key} already exists in language ${lang}`)
                it[part] ??= {}
                it = it[part]
                continue
            }
            // assert(!it[part], `Translation ${key} already exists in language ${lang} as ${JSON.stringify(it[part])}`)
            it[part] = formatString
        }
    }

    translate(lang, key, ...args) {
        if (lang === 'key') return `${key}.${args.join('.')}`
        let it = this.translations
        assert(it, `Translations not loaded`)

        assert(typeof lang === 'string', `Language not string: ${lang}`)
        it = it[lang]
        assert(it, `Language ${lang} not loaded`)

        assert(typeof key === 'string', `Translation key not string: ${key}`)
        it = it[key]
        assert(it, `Translation ${key} not found in language ${lang}`)

        for (const arg of args) {
            if (typeof it === 'object' && arg in it) it = it[arg]
            else break
        }

        // fallthrough case
        if (typeof it === 'object' && '' in it) {
            it = it['']
        }

        assert(typeof it === 'string', `Translation ${key}.${args.join('.')} not found in language ${lang}`)

        let n = -1
        const translation = it.replace(/\{(\d*)\}/g, (_, match) => {
            n++
            if (match === '') {
                assertLess(n, args.length, `Translation ${key}: "${it}" expects more arguments, {} expects argument ${n}`)
                return args[n]
            }
            const argIx = parseInt(match, 10)
            assert(argIx >= 0, `Translation ${key}: "${it}" has invalid argument index ${match}`)
            assertLess(argIx, args.length, `Translation ${key}: "${it}" needs more arguments, {${argIx}} expected`)
            return args[argIx]
        })

        return translation
    }
}
