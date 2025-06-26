// clr-c-[10, 20, 30, 40]
// bg-[0, 1, 2, 3, 4, 5]
//border-[0, 1, 2]

const template = `
<div class="popout">
    <h2>Colors</h2>

    [[ for(let c=10; c<=40; c+=10) {  ]]
    <h3>clr-c-[[= c]]</h3>
    <article class="grid-auto-fit" style="grid-template-columns: repeat(9, 1fr);">
    [[ for(let bg=1; bg<=5; bg+=2) { ]]
        <div style="padding: 1rem;" class="bg-[[= bg]] border-0">bg-[[= bg]]</div>
        <div style="padding: 1rem;" class="bg-[[= bg]] border-0 clr-c-[[= c]] clr-ok">clr-ok</div>
        <div style="padding: 1rem;" class="bg-[[= bg]] border-0 clr-c-[[= c]] clr-warn">clr-warn</div>
        <div style="padding: 1rem;" class="bg-[[= bg]] border-0 clr-c-[[= c]] clr-err">clr-err</div>
        <div style="padding: 1rem;" class="bg-[[= bg]] border-0 clr-c-[[= c]] clr-0">clr-0</div>
        <div style="padding: 1rem;" class="bg-[[= bg]] border-0 clr-c-[[= c]] clr-1">clr-1</div>
        <div style="padding: 1rem;" class="bg-[[= bg]] border-0 clr-c-[[= c]] clr-2">clr-2</div>
        <div style="padding: 1rem;" class="bg-[[= bg]] border-0 clr-c-[[= c]] clr-3">clr-3</div>
        <div style="padding: 1rem;" class="bg-[[= bg]] border-0 clr-c-[[= c]] clr-4">clr-4</div>
    [[ } ]]
    </article>
    [[ } ]]
</div>
<style>
/*
[[ for (let i = 1; i <= 0; i++) { ]]
.color-rotate-children > div:nth-child([[= i + 1]]) {
    color: oklch(from currentColor l c calc(h + 140 * [[= i ]]));
    background-color: oklch(from currentColor l c calc(h + 140 * [[= i ]]));
}
.color-rotate-small-children > div:nth-child([[= i + 1]]) { color: oklch(from currentColor
    calc(clamp(0.3, l / pow(1.05, [[= i ]]), 1))
    calc(clamp(0.1, c * pow(1.02, [[= i ]]), 0.4))
    calc(h + 5 * [[= i ]])) ;
}
[[ } ]]
*/

:root {
    --brand-l: 0.9;
    --brand-c: 0.7;
    --brand-h: 220;
    --clr-l: 0.95;
    --clr-c: 0;
    --clr-h: 0;
    --clr-a: 1;
    color: oklch(var(--clr-l) var(--clr-c) var(--clr-h) / var(--clr-a, 1));
}

.clr-reset {
    --clr-l: 1;
    --clr-c: 1;
    --clr-h: 0;
    --clr-a: 1;
    color: oklch(var(--clr-l) var(--clr-c) var(--clr-h) / var(--brand-a, 1));
}


.clr-ok {
    --clr-l: 0.78;
    --clr-c: 0.33;
    --clr-h: 146;
    --clr-a: 1;
    color: oklch(var(--clr-l) var(--clr-c) var(--clr-h) / var(--clr-a, 1));
}

.clr-warn {
    --clr-l: 0.8;
    --clr-c: 0.2;
    --clr-h: 70;
    --clr-a: 1;
    color: oklch(var(--clr-l) var(--clr-c) var(--clr-h) / var(--clr-a, 1));
}

.clr-err {
    --clr-l: 0.70;
    --clr-c: 0.35;
    --clr-h: 18;
    --clr-a: 1;
    color: oklch(var(--clr-l) var(--clr-c) var(--clr-h) / var(--clr-a, 1));
}


[[ for (const [i, h] of [220, 300, 90, 175, 355].entries() ) { ]]
.clr-[[= i]] {
    --clr-l: var(--brand-l);
    --clr-c: var(--brand-c);
    --clr-h: [[= h ]];
    --clr-a: 1;
    color: oklch(var(--clr-l) var(--clr-c) var(--clr-h) / var(--clr-a, 1));
}
[[ } ]]

[[ for (let i = 0; i < 10; i++) { ]]
.bg-[[= i ]] {
    background-color: oklch(
        calc(var(--bg-l, var(--clr-l) / [[= 6 - i ]]))
        calc(var(--bg-c, var(--clr-c) / [[= 6 - i ]]))
        var(--bg-h, var(--clr-h))
        / var(--bg-a, var(--clr-a, 1))
    );
}
[[ } ]]

[[ for(const [i, b] of [1, 2, 0].entries()) { ]]
.border-[[= i ]] {
    border-color: oklch(
        var(--b-l, calc(var(--clr-l) / [[= b ]]))
        var(--b-c, calc(var(--clr-c) / [[= b ]]))
        var(--b-h, var(--clr-h))
        / var(--b-a, var(--clr-a, 1))
    );
    border-width: var(--b-width, [[= b === 2 ? '2px' : '1px' ]]);
    border-style: var(--b-style, solid);
    border-radius: var(--b-radius, 10px);
}
[[ } ]]

[[ for (let i = 0; i <= 100; i+=10) { ]]
.clr-l-[[= i ]] {
    --clr-l: [[= i / 100]];
}
.bg-l-[[= i ]] {
    --bg-l: [[= i / 100]];
}
.border-l-[[= i ]] {
    --b-l: [[= i / 100]];
}
[[ } ]]

[[ for (let i = 0; i <= 50; i+=5) { ]]
.clr-c-[[= i ]] {
    --clr-c: [[= i / 100]];
}
.bg-c-[[= i ]] {
    --bg-c: [[= i / 100]];
}
.b-c-[[= i ]] {
    --b-c: [[= i / 100]];
}
[[ } ]]

[[ for (let i = 0; i <= 360; i+=10) { ]]
.clr-h-[[= i ]] {
    --clr-h: [[= i ]];
}
.bg-h-[[= i ]] {
    --bg-h: [[= i ]];
}
.b-h-[[= i ]] {
    --b-h: [[= i ]];
}
[[ } ]]

[[ for (let i = 0; i <= 100; i+=10) { ]]
.clr-a-[[= i ]] {
    --clr-a: [[= i / 100]];
}
.bg-a-[[= i ]] {
    --bg-a: [[= i / 100]];
}
.b-a-[[= i ]] {
    --b-a: [[= i / 100]];
}
[[ } ]]

.bg-pop {
    --bg-h: calc(var(--clr-h) + 120);
    padding: 20px;
}
</style>
`

export function view(router, {}) {
    router.get('/', async (ctx) => {
        ctx.response.render(template)
    })
}
