import { assert, assertFound } from '@/utils/assert.js'
import { eq } from 'drizzle-orm'
import { STATUS_TEXT } from 'jsr:@std/http'
import { verify } from 'jsr:@wok/djwt'

export async function setupMiddleware(app, deps) {
    await authMiddleware(app, deps)
    utilityContextMiddleware(app, deps)
    indexHtmlMiddleware(app, deps)
    errorHandlingMiddleware(app, deps)
}

export function utilityContextMiddleware(app, { eta }) {
    app.use(async (ctx, next) => {
        ctx.response.render = (template, input) => {
            ctx.response.body = eta.renderString(template, input)
        }
        ctx.formData = Object.fromEntries(await ctx.request.body().value || [])
        await next()
    })
}

export function indexHtmlMiddleware(app, { eta }) {
    app.use(async (ctx, next) => {
        await next()
        if (ctx.request.headers.get('hx-request') === 'true') return
        const content = `${ctx.response.body}`
        const username = await ctx.cookies.get('name')
        ctx.response.body = eta.render('index', { content, username })
    })
}

export function errorHandlingMiddleware(app, { env, eta }) {
    app.use(async (ctx, next) => {
        let header = 'Route not found'
        let stack = null
        try {
            await next()
        } catch (err) {
            ctx.response.status = err.status || 500
            header = `${err.status} ${STATUS_TEXT[err.status]}`
            if (env.ENVIRONMENT === 'development') stack = `${err.stack}`
            console.error('Server error:', err)
        }

        const status = ctx.response.status
        if (status >= 400) {
            ctx.response.headers.set('hx-reswap', 'none')
            ctx.response.body = eta.render('toast', { header, stack })
            ctx.response.status = status
        }
    })
}

export function authMiddleware(app, { authKey, translations, db }) {
    app.use(async (ctx, next) => {
        try {
            const jwt = await ctx.cookies.get('jwt')
            if (!jwt) ctx.throw(401, 'JWT cookie not found')
            const { email } = await verify(jwt, authKey)
            const [user, ...rest] = await db
                .select({ name: db.user.name, email: db.user.email, passwordHash: db.user.passwordHash })
                .from(db.user).where(eq(db.user.email, email))
            assertFound(user, 'User not found')
            assert(rest.length === 0, 'Multiple users found')
            ctx.state.user = user
        } catch {
            return ctx.response.redirect('/login')
        }

        ctx.t = translations.translate.bind(translations, ctx.state.user.language || 'en')
        return await next()
    })
}
