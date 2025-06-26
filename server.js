import { Application, Router } from "oak";
import { setupMiddleware } from "./middleware.js";

export async function setupServer(deps) {
    const app = new Application();

    await setupMiddleware(app, deps);
    const endpointRoutes = await setupEndpointRoutes(deps);

    const router = new Router();
    router.get("/live-reload", (ctx) => ctx.sendEvents());
    router.use(endpointRoutes);
    app.use(router.routes());
    app.use(router.allowedMethods());

    try {
        console.log("Starting server on http://0.0.0.0:8000");
        await app.listen({ port: 8000 });
    } catch (error) {
        console.error("Error starting the server:", error);
        console.log("Closing database connection");
        await db.$client.end();
    }
}

async function setupEndpointRoutes(deps) {
    const router = new Router();

    // mark as x-endpoint so that middleware can insert index.html if needed
    router.use(async (ctx, next) => {
        await next();
        ctx.response.headers.set("x-endpoint", "true");
    });

    // iterate over endpoints directory
    const files = Deno.readDir("./endpoints");
    for await (const file of files) {
        if (file.name.endsWith(".js")) {
            const module = await import(`./endpoints/${file.name}`);
            const viewName = Object.keys(module)[0];
            module[viewName](router, deps);
        }
    }

    return router.routes();
}
