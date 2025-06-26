const template = `
<h2>Comments</h2>
Add comments here
`

export function view(router) {
    router.get('/', async (ctx) => {
        ctx.response.render(template, {})
    })
}
