const dirsTemplate = `
[[~ it.header ? '<h1>Files</h1>' : '' ]]
[[= dirs.length === 0 ? '-' : '' ]]
[[ Object.values(dirs).forEach(function({name, id}) { ]]
<details hx-get="/files/directory/[[=id]]" hx-trigger="mouseover once" hx-target="#content-[[=id]]">
    <summary>[[= name ]]</summary>
    <div class="ml-6" id="content-[[=id]]"><div aria-busy="true" /> </div>
</details>
[[ }) ]]
`

import { isNull, eq } from 'drizzle-orm'

export function view(router, { db }) {
    router.get('/', async (ctx) => {
        const dirs = await db.select({ id: db.fileDirectory.id, name: db.fileDirectory.name })
            .from(db.fileDirectory).where((isNull(db.fileDirectory.parentId)))
        ctx.response.render(dirsTemplate, { dirs, header: true })
    })

    router.get('/directory/:id', async (ctx) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const { id } = ctx.params
        const dirs = await db.select({ id: db.fileDirectory.id, name: db.fileDirectory.name })
            .from(db.fileDirectory).where((eq(db.fileDirectory.parentId, id)))
        ctx.response.render(dirsTemplate, { dirs })
    })
}
