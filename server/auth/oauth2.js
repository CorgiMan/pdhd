import { issueJWT } from '@/server/auth/auth.js'
import { assert } from '@/utils/assert.js'

// todo: test clients with real cloud providers

export function view(router, { env }) {
    assert(env.GOOGLE_CLIENT_ID, 'CLIENT_ID not in env')
    assert(env.GOOGLE_CLIENT_SECRET, 'CLIENT_SECRET not in env')

    const providers = {
        google: {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            authURL: 'https://accounts.google.com/o/oauth2/v2/auth',
            tokenURL: 'https://oauth2.googleapis.com/token',
            userInfoURL: 'https://www.googleapis.com/oauth2/v2/userinfo',
            redirectURI: 'http://localhost:8000/auth/google/callback',
        },
        // todo
        // facebook: {},
        // github: {},
        // apple: {},
        // microsoft: {},
        // twitter: {},
        // linkedin: {},
        // spotify: {},
        // discord: {},
        // twitch: {},
    }

    for (const [providerName, provider] of providers.$entries()) {
        addProviderRoutes(router, providerName, provider)
    }
}

function addProviderRoutes(router, providerName, provider) {
    const redirectURI = encodeURIComponent(provider.redirectURI)

    router.get(`/auth/${providerName}`, (ctx) => {
        ctx.response.redirect(`${provider.authURL}?response_type=code&scope=email%20profile&access_type=offline&client_id=${provider.clientID}&redirect_uri=${redirectURI}`)
    })

    router.get(`/auth/${providerName}/callback`, async (ctx) => {
        const code = ctx.query.code
        assertRequestOk(code, 'Authorization code not found.')

        const tokenResponse = await fetch(provider.tokenURL, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ code: code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectURI }),
        })
        const token = await tokenResponse.json()
        const accessToken = token.access_token
        assertRequestOk(accessToken, 'Failed to fetch access token.')

        const userResponse = await fetch(provider.userInfoURL, { headers: { 'Authorization': `Bearer ${accessToken}` } })
        const user = await userResponse.json()
        await issueJWT(env, ctx, { name: user.name, email: user.email })
    })
}
