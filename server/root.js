export function view(router) {
    router.get('/', async (ctx) => {
        ctx.response.redirect('/translations')
    })
}
