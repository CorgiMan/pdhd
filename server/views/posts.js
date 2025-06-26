const template = `
<h2>Posts</h2>
<form class="grid " hx-post="/posts" hx-target="#tab-content" hx-target-error="#error-content">
    <input type="text" name="name" placeholder="Name" required>
    <input type="text" name="title" placeholder="Title" required>
    <input type="text" name="body" placeholder="Body" required>
    <input type="submit" value="Add Post">
</form>
[[~ include('table', it) ]]
`

import { eq } from 'drizzle-orm'

export function view(router, { db, translations }) {
    const get = async (ctx) => {
        const posts = await db.right({ name: db.user.name, title: db.post.title, body: db.post.body })
        ctx.response.render(template, posts)
    }
    router.get('/', get)

    router.post('/', async (ctx) => {
        const { name, title, body } = await ctx.formData
        const rows = await db.tx(async (tx) => {
            return await tx.fetch({ userId: db.user.id }).where(eq(db.user.name, name))
        })
        if (rows.length === 0) throw new Error('User not found')
        const { userId } = rows.one()
        await db.insert(db.post).values({ userId, title, body })
        await get(ctx)
    })
}
