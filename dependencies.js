import { setupDatabase } from '@/db/setup.js'
import { FeatureFlags } from '@/feature-flags/index.js'
import { setupWorker } from '@/worker/index.js'
import { sql } from 'drizzle-orm'
import { Eta } from 'eta'
import { config } from 'https://deno.land/x/dotenv/mod.ts'
import { Translations } from './translations/index.js'

export const setupDependencies = async ({ startWorker, runMigrations }) => {
    const env = config()

    if (env.ENVIRONMENT === 'development') {
        globalThis.c = console.log
    }

    const keyData = { kty: 'oct', k: env.AUTH_SECRET_KEY, alg: 'HS512', key_ops: ['sign', 'verify'], ext: true }
    const authKey = await crypto.subtle.importKey('jwk', keyData, { name: 'HMAC', hash: 'SHA-512' }, true, ['sign', 'verify'])

    const eta = new Eta({
        useWith: true,
        tags: ['[[', ']]'],
        views: './server/templates',
        defaultExtension: '.html',
        cache: env.ENVIRONMENT === 'production',
    })

    const db = await setupDatabase({ dbUrl: env.DATABASE_URL, runMigrations })

    let devTranslations
    if (env.ENVIRONMENT === 'development') {
        devTranslations = {
            'en': { ...(await import('./translations/dev-locale.js')).language },
            'fr': { ...(await import('./translations/dev-locale.js')).language },
            'nl': { ...(await import('./translations/dev-locale.js')).language },
        }
    }
    const translations = await new Translations().setup({
        translations: devTranslations,
        fetch: async (updateTranslations) => {
            const translations = await db.execute(sql`SELECT * FROM "translation"`)
            updateTranslations(translations)
        },
        listen: (updateTranslations) =>
            db.client.listen('translation_changes', (change) => {
                const { lang, oldKey, newKey, newFormatString, operation } = JSON.parse(change)
                updateTranslations(lang, oldKey, newKey, newFormatString, operation)
            }),
    })

    const features = await new FeatureFlags().setup({
        fetch: async () => (await db.execute(sql`SELECT * FROM "featureFlag"`)).key('name', 'value'),
        set: async (name, value) => {
            await db.execute(sql`UPDATE "featureFlag" SET value = ${value} WHERE name = ${name}`)
        },
        listen: (updateFlag) =>
            db.client.listen('feature_flag_changes', (change) => {
                const { name, newValue } = JSON.parse(change)
                updateFlag(name, newValue)
            }),
    })

    const worker = startWorker ? await setupWorker() : undefined

    return { env, db, eta, translations, features, worker, authKey }
}
