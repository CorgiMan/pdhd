const template = `
<h2>Feature Flags</h2>
[[ switches.forEach((s, i) => { ]]
    [[~ i>0 ? '<hr />' : '<br />' ]]
    [[~ include('switch', s) ]]
[[ }) ]]
`

export function view(router, { features }) {
    router.get('/', async (ctx) => {
        ctx.response.render(template, {
            switches: features.flags.$map((name, value) => ({
                name,
                checked: value === 'true',
                hxPost: '/feature-flags/toggle',
            })),
        })
    })

    router.post('/toggle', async (ctx) => {
        const { name, checked } = ctx.formData
        const value = (!!checked).toString()
        await features.set(name, value)
        ctx.response.status = 200
    })
}
