// 30 css, 15 html, 85 js + server

import { randomInt } from '@/utils/rand.js'

let W, H, revealed, mines, marked, startTime

export function view(router, { eta }) {
    router.get('/', async (ctx) => {
        reset()
        ctx.response.body = eta.render('minesweeper', { header: true, W, H, minesLeft: calcMinesLeft(), startTime })
    })

    router.post('/cell/:id', async (ctx) => {
        ctx.response.body = ''
        const id = parseInt(ctx.params.id)
        explore(ctx, id)
    })
}

function reset() {
    W = randomInt(6, 20)
    H = randomInt(6, 20)
    revealed = new Set()
    marked = new Set()
    mines = new Set()
    startTime = Date.now() / 1000
    const numMines = Math.floor(W * H / 10)
    for (let i = 0; i < numMines; i++) {
        mines.add(findSpotForMine())
    }
}

function calcMinesLeft() {
    return mines.size - marked.size
}

function findSpotForMine() {
    while (true) {
        const id = randomInt(0, W * H)
        if (!mines.has(id)) return id
    }
}

function toRC(id) {
    return [Math.floor(id / W), id % W]
}

function adjacentMines(id) {
    let numMines = 0
    const [r, c] = toRC(id)
    for (const mine of mines) {
        const [mineR, mineC] = toRC(mine)
        if (Math.abs(mineR - r) <= 1 && Math.abs(mineC - c) <= 1) {
            numMines++
        }
    }
    return numMines
}

function explore(ctx, id) {
    if (marked.has(id)) {
        marked.delete(id)
        ctx.response.body += `<div id="cell-${id}" hx-swap-oob="true"></div>`
        ctx.response.body += `<div id="mines-left" hx-swap-oob="true">${calcMinesLeft()}</div>`
        return
    }
    if (ctx.request.headers.get('x-cmd-key')) {
        marked.add(id)
        ctx.response.body += `<div id="cell-${id}" hx-swap-oob="true">⛳️</div>`
        ctx.response.body += `<div id="mines-left" hx-swap-oob="true" hx-swap="outerHTML">${calcMinesLeft()}</div>`
        return
    }

    // mine on first click, move it
    if (mines.has(id) && revealed.size === 0) {
        mines.add(findSpotForMine())
        mines.delete(id)
    }

    reveal(ctx, id)

    // lose
    if (mines.has(id)) {
        for (let i = 0; i < W * H; i++) {
            if (!revealed.has(i)) reveal(ctx, i)
        }
        ctx.response.body += '<div id="game-result" hx-swap-oob="true">You lose!</div>'
        const totalTime = Math.floor(Date.now() / 1000 - startTime)
        ctx.response.body += `<div id="seconds-clock" hx-swap-oob="true">${totalTime}</div>`
        return
    }

    // win
    if (revealed.size === W * H - mines.size) {
        ctx.response.body += '<div id="game-result" hx-swap-oob="true">You win!</div>'
        const totalTime = Math.floor(Date.now() / 1000 - startTime)
        ctx.response.body += `<div id="seconds-clock" hx-swap-oob="true">${totalTime}</div>`
        return
    }
}

function reveal(ctx, id) {
    if (revealed.has(id)) return
    revealed.add(id)

    const numAdjacentMines = adjacentMines(id)
    if (mines.has(id)) {
        ctx.response.body += `<div id="cell-${id}" class="pressed" hx-swap-oob="true">💣</div>`
    } else {
        ctx.response.body += `<div id="cell-${id}" class="pressed" hx-swap-oob="true">${numAdjacentMines}</div>`
    }

    if (numAdjacentMines !== 0) return

    const [r, c] = toRC(id)
    for (const j of [r - 1, r, r + 1]) {
        for (const i of [c - 1, c, c + 1]) {
            if (i === c && j === r || j < 0 || j >= H || i < 0 || i >= W) continue
            reveal(ctx, j * W + i)
        }
    }
}
