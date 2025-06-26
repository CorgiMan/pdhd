// this is used by drizzle-kit (node not deno) to generate the migrations

import process from "node:process";
export default {
    schema: './db/schema.js',
    out: './db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
}
