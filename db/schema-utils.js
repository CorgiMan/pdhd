import { sql } from 'drizzle-orm'
import { index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

const idGenSql = sql`lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0')`

export const id = varchar({ length: 30 })
export const ts = () => timestamp({ precision: 6, withTimezone: true })
export const ref = (tableFn) => varchar({ length: 30 }).references(() => tableFn().id)

// setup table with id, createdAt, updatedAt, deletedAt and auto create indexes for foreign keys
export function table(name, config) {
    return pgTable(name, {
        id: id.primaryKey().default(idGenSql).notNull(),
        createdAt: ts().defaultNow().notNull(),
        updatedAt: ts().defaultNow().notNull(),
        deletedAt: ts(),
        ...config,
    }, (table) => {
        const result = []
        for (const field of Object.values(table)) {
            const isForeignKey = field.config.foreignKeyConfigs?.length > 0
            if (!isForeignKey) continue
            result[`${field.name}Idx`] = index().on(field)
        }
        return result
    })
}

export * from 'drizzle-orm'
export * from 'drizzle-orm/pg-core'
