import { send } from "oak";

export async function setupMiddleware(app, deps) {
    errorHandlingMiddleware(app, deps);
    staticFilesMiddleware(app, deps);
    utilityContextMiddleware(app, deps);
    await indexHtmlMiddleware(app, deps);
}

function errorHandlingMiddleware(app) {
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.response.status = err.status || 500;
            ctx.response.body = {
                error: err.message,
                stack: err.stack,
            };
            console.error("Server error:", err);
        }
    });
}

function staticFilesMiddleware(app) {
    app.use(async (ctx, next) => {
        if (!ctx.request.url.pathname.startsWith("/public")) {
            return await next();
        }
        try {
            await send(ctx, ctx.request.url.pathname, {
                root: `${Deno.cwd()}`,
            });
        } catch {
            console.log("not found", ctx.request.url.pathname);
            await next();
        }
    });
}

function utilityContextMiddleware(app, { eta }) {
    app.use(async (ctx, next) => {
        ctx.response.render = (template, input) => {
            ctx.response.body = eta.renderString(template, input);
        };

        await next();
    });
}

async function indexHtmlMiddleware(app, { eta }) {
    const indexHtmlTemplate = await eta.render("index", {
        // partially rendered, middleware will render htmx contents
        content: "<%~ it.content %>",
        tabs: [
            { path: "/users", label: "Users" },
            { path: "/posts", label: "Posts" },
            { path: "/comments", label: "Comments" },
        ],
    });

    app.use(async (ctx, next) => {
        await next();
        if (ctx.response.headers.get("x-endpoint") !== "true") return;
        if (ctx.request.headers.get("hx-request") === "true") return;
        const content = "<div >" + ctx.response.body + "</div>";
        ctx.response.render(indexHtmlTemplate, { content });
    });
}
