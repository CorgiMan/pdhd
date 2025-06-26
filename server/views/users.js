const template = `
<h2>Users</h2>
<form class="grid" hx-post="/users" hx-target="#tab-content" hx-target-error="#error-content">
    <input type="text" name="name" placeholder="Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="submit" value="Add User">
</form>
[[~ include('table', it) ]]
`

export function view(router, { db }) {
    const get = async (ctx) => {
        const users = await db.fetch({ name: db.user.name, email: db.user.email, language: db.user.language })
        ctx.response.render(template, users)
    }
    router.get('/', get)

    router.post('/', async (ctx) => {
        const body = await ctx.request.body().value
        const { name, email } = Object.fromEntries(body)
        await db.insert(db.user).values({ name, email })
        await get(ctx)
    })
}
