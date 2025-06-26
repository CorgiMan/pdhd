import { assert, assertInstanceOf } from 'jsr:@std/assert'
import { eq, getTableName, sql } from 'drizzle-orm'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { PgColumn } from 'drizzle-orm/pg-core'

import * as schema from './schema.js'

export async function setupDatabase({ dbUrl, runMigrations }) {
    const client = postgres(dbUrl, { onnotice: () => {} })

    const db = drizzle(client)
    if (db.client) throw new Error(`Can't overload client in db`)
    db.client = client

    if (runMigrations) {
        console.log('Running migrations...')
        await migrate(db, { migrationsFolder: './db/migrations' })
        await db.execute(addUpdateTriggersToAllTables)
    }

    if (db.tx) throw new Error(`Can't overload tx in db`)
    extend(db)

    db.tx = async (callback) =>
        await client.transaction((tx) => {
            extend(tx)
            return callback(tx)
        })

    // add tables to db for easy access
    for (const table in schema) {
        if (db[table]) throw new Error(`Can't overload ${table} in db`)
        db[table] = schema[table]
    }

    return db
}

function extend(obj) {
    if (obj.fetch) throw new Error(`Can't overload fetch in obj`)
    if (obj.left) throw new Error(`Can't overload fetch in obj`)
    if (obj.right) throw new Error(`Can't overload fetch in obj`)
    if (obj.inner) throw new Error(`Can't overload fetch in obj`)
    if (obj.outer) throw new Error(`Can't overload fetch in obj`)
    obj.fetch = dbFetch.bind(obj, 'leftJoin')
    obj.left = dbFetch.bind(obj, 'leftJoin')
    obj.right = dbFetch.bind(obj, 'rightJoin')
    obj.inner = dbFetch.bind(obj, 'innerJoin')
    obj.outer = dbFetch.bind(obj, 'outerJoin')
}

// joins together tables based on foreign keys and fetches the data specified
// in the structure which is an object with PgColumn values
function dbFetch(joinType, structure) {
    const tables = []
    for (const column of structure.$values()) {
        assertInstanceOf(column, PgColumn)
        if (!tables.includes(column.table)) {
            tables.push(column.table)
        }
    }

    assert(tables.length > 0)
    assert(tables[0])
    let query = this.select(structure).from(tables[0])
    for (let i = 1; i < tables.length; i++) {
        const fkey = `${getTableName(tables[i - 1])}Id`
        assert(tables[i])
        assert(tables[i][fkey])
        assert(query[joinType])
        query = query[joinType](tables[i], eq(tables[i - 1].id, tables[i][fkey]))
    }

    // todo: maybe allow nested structure in select e.g. {users:{name: db.users.name}, sessions:{...]]
    // todo: maybe add where clause

    return query
}

const addUpdateTriggersToAllTables = sql`
    -- Create the trigger function
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
        BEGIN
            NEW."updatedAt" = NOW();
            RETURN NEW;
        END;
    $$ LANGUAGE plpgsql;

    -- Add the trigger to the tables
    DO $$
        DECLARE
            table_name TEXT;
        BEGIN
            -- Loop through all tables with an updated_at column
            FOR table_name IN
                SELECT c.table_name
                FROM information_schema.columns c
                WHERE column_name = 'updatedAt'
                AND table_schema = 'public' -- Adjust schema if necessary
            LOOP
                -- Generate the CREATE TRIGGER statement dynamically
                EXECUTE format(
                    'CREATE OR REPLACE TRIGGER set_updated_at
                    BEFORE UPDATE ON %I
                    FOR EACH ROW
                    EXECUTE FUNCTION update_updated_at_column();',
                    table_name
                );
            END LOOP;
        END;
    $$ LANGUAGE plpgsql;
`
