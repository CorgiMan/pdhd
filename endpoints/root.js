export function rootView(router) {
    router.get("/", async (ctx) => {
        ctx.response.redirect("/users");
    });
}
