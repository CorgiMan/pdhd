import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Eta } from "eta";
import "./array-utils.js";
import { setupDatabase } from "./drizzle/setup.js";
import { setupServer } from "./server.js";

const env = config();
const eta = setupEta({ env });
const db = await setupDatabase({ env });
await setupServer({ env, db, eta });

function setupEta({ env }) {
    return new Eta({
        views: "./templates",
        defaultExtension: ".html",
        cache: env.ENVIRONMENT === "production",
    });
}
