const template = `
<h2>Translations</h2>
[[// <pre>[[= table.$json() ]]</pre>

<div
    x-data="{ lang1: '[[= langs[0] ]]', lang2: '[[= langs[1] ]]', lang3: '[[= langs[2] ]]'}"
>
    [[// HEADER ]]
    <div class="grid pb-2">
        <div class="font-bold">key</div>
        [[ for(const lang of langs) { ]]
        <details class="dropdown w-20">
        <summary>[[= lang]]</summary>
        <ul>
            [[ for(const lang of langs) { ]]
             [[// todo: on click change the selected lang]]
            <li>[[= lang ]]</li>
            [[ } ]]
        </ul>
        </details>
        [[ } ]]
    </div>

    [[// MAIN ROW ]]
    [[ for(const [key, byFilter] of table.$entries()) {  ]]
    <div class="grid">
        <input class="text-xs font-mono" style="height:1rem;" value="[[= key ]]"></input>
        [[ for(const lang of langs) { ]]
        <input class="text-xs" style="height:1rem;" value="[[= lang in byFilter[''] ? byFilter[''][lang] : '' ]]"></input>
        [[ } ]]
    </div>

    [[// FILTER ROWS ]]
    [[ for(const filter of byFilter.$keys().sort()) { ]]
    [[ if(filter === '') continue ]]
    [[ const byLang = byFilter[filter] ]]
    <div class="grid">
        <input class="text-xs font-mono" style="height:1rem;" value="[[= key ]].[[= filter ]]"></input>
        [[ for(const lang of langs) { ]]
        <input class="text-xs" style="height:1rem;" value="[[= lang in byLang ? byLang[lang] : '' ]]"></input>
        [[ } ]]
    </div>
    [[ } ]]
    <div class="mb-4"></div>
    [[ } ]]
</div>
`

export function view(router, { db, translations }) {
    router.get('/', async (ctx) => {
        const langs = translations.translations.$keys()
        const flatTranslations = []
        addDottedKeys(flatTranslations, '', translations.translations)
        flatTranslations.sort((a, b) => a.key.localeCompare(b.filters))
        const table = flatTranslations.group('key', null, (keyGroup) => keyGroup.group('filters', (tr) => tr, (x) => x.key('lang', (t) => t.formatString)))
        ctx.response.render(template, { table, langs })
    })
}

function addDottedKeys(result, prefix, keyObject) {
    for (const [key, value] of keyObject.$entries()) {
        const path = prefix ? `${prefix}.${key}` : key
        const next = value instanceof Object ? value : null
        if (next) addDottedKeys(result, path, next)
        const formatString = typeof value === 'string' ? value : null
        if (formatString) {
            const [lang, key, ...filters] = path.split('.')
            result.push({ lang, key, filters: filters.join('.'), formatString })
        }
    }
}
