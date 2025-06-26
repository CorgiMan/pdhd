import { assert, assertOkRequest } from '@/utils/assert.js'
import { seconds } from '@/utils/time.js'
import { eq } from 'drizzle-orm'
import { hash, verify } from 'jsr:@felix/bcrypt'
import { create, getNumericDate } from 'jsr:@wok/djwt'

const HOME_PAGE = '/minesweeper'

export async function issueJWT(authKey, env, ctx, { email, name }) {
    const jwt = await create({ alg: 'HS512', typ: 'JWT' }, { email, exp: getNumericDate(seconds('1y')) }, authKey)
    ctx.cookies.set('jwt', jwt, { httpOnly: true, secret: env.ENVIRONMENT !== 'development', sameSite: 'strict' })
    ctx.cookies.set('name', name, { httpOnly: true, secret: env.ENVIRONMENT !== 'development', sameSite: 'strict' })
    ctx.cookies.set('email', email, { httpOnly: true, secret: env.ENVIRONMENT !== 'development', sameSite: 'strict' })
    ctx.response.body = `<script>window.location.href="${HOME_PAGE}";</script>`
}

export function setupAuthEndpoints(router, { env, eta, db, translations, authKey }) {
    router.post('/logout', async (ctx) => {
        await ctx.cookies.delete('jwt')
        await ctx.cookies.delete('name')
        await ctx.cookies.delete('email')
        ctx.response.body = `<script>window.location.href="/login";</script>`
    })

    router.get('/login', async (ctx) => {
        ctx.response.body = eta.renderString(`
<h1>Login</h1>
<form class="w-80" hx-post="/login" hx-swap="afterend">
    <input type="email" id="email" name="email" placeholder="email" />
    <input type="password" id="password" name="password" placeholder="password" />
    <button type="submit">Submit</button>
</form>
<a class="w-80 flex justify-center" hx-get="/signup" hx-target="#tab-content">Signup</a>
`)
    })

    router.post('/login', async (ctx) => {
        const failureMessage = 'Cannot find user with that email and password'
        const [user, ...rest] = await db.select({ name: db.user.name, email: db.user.email, passwordHash: db.user.passwordHash })
            .from(db.user).where(eq(db.user.email, ctx.formData.email))
        assertOkRequest(user, failureMessage)
        assertOkRequest(rest.length === 0, failureMessage)

        const passwordMatch = await verify(ctx.formData.password, user.passwordHash)
        assert(passwordMatch, failureMessage)
        await issueJWT(authKey, env, ctx, user)
    })

    router.get('/signup', async (ctx) => {
        ctx.response.body = eta.renderString(`
<h1>Signup</h1>
<form class="w-80" hx-post="/signup" hx-swap="afterend">
    <input type="text" id="name" name="name" placeholder="name">
    <input type="email" id="email" name="email" placeholder="email">
    <input type="password" id="password" name="password" placeholder="password">
    <input type="password" id="confirm_password" name="confirm_password" placeholder="confirm password">
    <button type="submit">Submit</button>
</form>
<a class="w-80 flex justify-center" hx-get="/login" hx-target="#tab-content">Login</a>
`)
    })

    router.post('/signup', async (ctx) => {
        const acceptedLanguage = ctx.request.headers.get('accept-language').split(',').map((lang) => lang.split(';')[0])
        let language = 'en'
        for (const lang of acceptedLanguage) {
            if (translations.translations.$keys().includes(lang)) {
                language = lang
                break
            }
        }

        const { name, email, password, confirm_password } = ctx.formData
        assertOkRequest(name, 'Name is required')
        assertOkRequest(email, 'Email is required')
        assertOkRequest(password, 'Password is required')
        assertOkRequest(confirm_password, 'Confirm password is required')
        assertOkRequest(password === confirm_password, 'Passwords do not match')
        const passwordHash = await hash(password)
        await db.insert(db.user).values({ name, email, passwordHash, language })
        await issueJWT(authKey, env, ctx, { name, email })
    })
}
