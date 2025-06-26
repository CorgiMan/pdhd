import { assert, assertInstanceOf } from "jsr:@std/assert";
import { eq, getTableName } from "drizzle-orm";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { PgColumn } from "drizzle-orm/pg-core";

import * as schema from "./schema.js";

export async function setupDatabase({ env }) {
    const client = postgres(env.DATABASE_URL, { onnotice: () => {} });
    const db = drizzle(client);
    if (db["fetch"]) throw new Error(`Can't overload fetch in db`);
    db.fetch = dbFetch.bind(db);

    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "./drizzle/migrations" });
    for (const table in schema) {
        if (db[table]) throw new Error(`Can't overload ${table} in db`);
        db[table] = schema[table];
    }

    return db;
}

// joins together tables based on foreign keys and fetches the data specified
// in the structure which is an object with PgColumn values
function dbFetch(structure, where = {}) {
    const tables = [];
    for (const column of structure.values()) {
        assertInstanceOf(column, PgColumn);
        if (!tables.includes(column.table)) {
            tables.push(column.table);
        }
    }

    assert(tables.length > 0);
    assert(tables[0]);
    let query = this.select(structure).from(tables[0]);
    for (let i = 1; i < tables.length; i++) {
        const fkey = `${getTableName(tables[i - 1])}Id`;
        assert(tables[i]);
        assert(tables[i][fkey]);
        query = query.leftJoin(tables[i], eq(tables[i - 1].id, tables[i][fkey]));
    }

    // todo: maybe allow nested structure in select e.g. {users:{name: db.users.name}, sessions:{...}}
    // todo: add where clause

    return query;
}
