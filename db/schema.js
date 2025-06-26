// You need to have the following installed in your path, wouldn't be needed if drizzle-kit supported Deno
//     $ npm i -g drizzle-kit drizzle-orm pg dotenv
//
// Generate migrations with:
//     $ fnm use v20.18.0
//     $ drizzle-kit --config db/drizzle.config.js generate
//
// To merge all migrations into one file:
//     $ drizzle-kit --config db/drizzle.config.js drop
//     $ drizzle-kit --config db/drizzle.config.js generate
//
// To create custom migration:
//     $ drizzle-kit --config db/drizzle.config.js generate --custom --name custom_name
//

import { ref, table, text, ts } from './schema-utils.js'

export const user = table('user', {
    name: text().notNull(),
    email: text().notNull().unique(),
    passwordHash: text(),
    language: text().default('en'),
})

export const userSession = table('userSession', {
    userId: ref(() => user).notNull(),
    expiresAt: ts().notNull(),
})

export const post = table('post', {
    userId: ref(() => user).notNull(),
    title: text().notNull(),
    body: text().notNull(),
})

export const fileDirectory = table('fileDirectory', {
    name: text().notNull(),
    parentId: ref(() => fileDirectory),
})

export const file = table('file', {
    name: text().notNull(),
    fileDirectoryId: ref(() => fileDirectory).notNull(),
    size: text().notNull(),
    mimeType: text().notNull(),
    content: text().notNull(),
})
