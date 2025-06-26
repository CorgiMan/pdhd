const template = `

<h2>Modal</h2>
[[~
    include('modal', {
        event: 'open-modal-aaa',
        body: '<p>Greetings, one and all!</p>',
    })
]]

[[~
    include('modal', {
        body: '<p>Greetings, two and all!</p>',
        cancel: true,
        confirm: 'alert("Confirmed!")',
    })
]]
<div class="flex flex-col max-w-max">
<button class="mb-2" x-data @click="[[= $openModal ]]">Open Modal 1</button>
<button class="mb-2" x-data @click="$dispatch('open-modal-aaa')">Open Modal 1 again</button>
<button class="mb-2" x-data @click="[[= $openModal ]]">Open Modal 2</button>
<button class="mb-2" hx-get="/does-not-exist">Endpoint does not exist</button>
<button class="mb-2" hx-get="/error">Endpoint throws</button>

[[~include('popover')]]
</div>
`

export function view(router, {}) {
    router.get('/', async (ctx) => {
        ctx.response.render(template)
    })
}
