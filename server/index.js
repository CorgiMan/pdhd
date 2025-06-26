import { assert } from '@/utils/assert.js'
import { seconds } from '@/utils/time.js'
import { Application, Router, send } from 'oak'
import { setupAuthEndpoints } from './auth/auth.js'
import { authMiddleware, errorHandlingMiddleware, indexHtmlMiddleware, utilityContextMiddleware } from './middleware.js'

export async function setupServer(deps) {
    const app = new Application()
    utilityContextMiddleware(app, deps)
    errorHandlingMiddleware(app, deps)

    const router = new Router()
    setupPublicEndpoint(router, deps)
    setupLiveReload(router, deps)
    await setupViewRoutes(router, deps)
    app.use(router.routes())
    app.use(router.allowedMethods())

    try {
        console.log('Starting server on http://0.0.0.0:8000')
        await app.listen({ port: 8000 })
    } catch (error) {
        console.error('Error starting the server:', error)
        console.log('Closing database connection')
        await db.$client.end()
    }
}

async function setupViewRoutes(router, deps) {
    indexHtmlMiddleware(router, deps)
    setupAuthEndpoints(router, deps)

    // iterate over views directory
    authMiddleware(router, deps)
    for await (const file of Deno.readDir('./server/views')) {
        if (!file.name.endsWith('.js')) continue
        const mod = await import(`./views/${file.name}`)
        const viewRouter = new Router()
        mod.view(viewRouter, deps)
        const routePath = `/${file.name.replace('.js', '')}`
        router.use(routePath, viewRouter.routes(), viewRouter.allowedMethods())
    }
}

function setupPublicEndpoint(router, { env }) {
    let CACHE_DURATION = seconds('3600s')
    if (env.ENVIRONMENT === 'development') {
        CACHE_DURATION = seconds('0s')
    }

    router.get('/public/(.*)', async (ctx) => {
        ctx.response.headers.set('Cache-Control', `public, max-age=${CACHE_DURATION}`)
        try {
            await send(ctx, ctx.request.url.pathname, { root: `${Deno.cwd()}/` })
        } catch (e) {
            ctx.throw(404)
        }
    })
}

function setupLiveReload(router, { env }) {
    if (env.ENVIRONMENT !== 'development') return
    router.get('/live-reload', (ctx) => ctx.sendEvents())

    router.get('/error', (ctx) => {
        ctx.throw(404, 'Not found')
    })

    router.get('/health', async (ctx) => {
        ctx.response.headers.set('Content-Type', 'text/json')
        const cmd = new Deno.Command('git', { args: ['rev-parse', 'HEAD'] })
        const { code, stdout } = await cmd.output()
        assert(code === 0)
        const sha = new TextDecoder().decode(stdout).trim()
        ctx.response.body = JSON.stringify({ sha, status: 'ok', uptime: performance.now() / 1000 })
    })
}
