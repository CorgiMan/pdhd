const template = `
<h2>Components</h2>
[[~
    include('modal', { body: '<p>Greetings, one and all!</p>' });
    const openModal1 = modalReturnValue;
]]
[[~
    include('modal', { body: '<p>Greetings, two and all!</p>', cancel: true, confirm: 'alert("Confirmed!")' });
    const openModal2 = modalReturnValue;
]]
<div class="flex flex-col max-w-max xsss">
    <button class="mb-2 " x-data @click="[[= openModal1 ]]">Open Modal 1</button>
    <button class="mb-2" x-data @click="[[= openModal2 ]]">Open Modal 2</button>
    <button class="mb-2" x-data @click="[[= openModal1 ]]">Open Modal 1 again</button>
    <button class="mb-2" hx-get="/does-not-exist">Endpoint does not exist</button>
    <button class="mb-2" hx-get="/error">Endpoint throws</button>
</div>

<div class="popout mb-2 flex-spread">
    [[~include('popover')]]
    [[~include('popover')]]
</div>

<style>
    @scope (.xsss) {
        * {
            text-size-adjust: 100%;
            // background-color: #ff0000;
            // color: #00ff00;
            // font-weight: 10;
            // font-size: 10px;
            // line-height: var(--pico-line-height);
            // font-family: var(--pico-font-family);
            // text-underline-offset: var(--pico-text-underline-offset);
            // text-rendering: optimizeLegibility;
            // overflow-wrap: break-word;
            // -moz-tab-size: 4;
            // -o-tab-size: 4;
            // tab-size: 4;
        }
    }
</style>
`

export function view(router, {}) {
    router.get('/', async (ctx) => {
        ctx.response.render(template)
    })
}
