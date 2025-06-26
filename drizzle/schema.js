// You need to have the following installed in your path, wouldn't be needed if drizzle-kit supported deno
//     $ npm i -g drizzle-kit drizzle-orm pg dotenv
//
// Generate migrations with:
//     $ fnm use v20.18.0
//     $ drizzle-kit generate --config drizzle/drizzle.config.js
//
// To merge all migrations into one file:
//     $ rm -rf drizzle/migrations
//     $ drizzle-kit generate --config drizzle/drizzle.config.js
//     $ shasum -a 256 drizzle/migrations/0000_*.sql
//     $ delete from drizzle.__drizzle_migrations
//     $ insert into drizzle.__drizzle_migrations (name, hash) values ('0000_main', 'the hash');

import { ref, table, text, ts } from "./schema-utils.js";

export const user = table("user", {
  name: text().notNull(),
  email: text().notNull().unique(),
});

export const userSession = table("userSession", {
  userId: ref(user),
  expiresAt: ts().notNull(),
});
