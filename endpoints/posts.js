const postsTemplate = `
<div>
    <h2 class="text-2xl font-bold mb-4">Posts</h2>
    Add posts here
</div>
`;

export function postsView(router) {
    router.get("/posts", async (ctx) => {
        // Implement your posts logic here
        ctx.response.render(postsTemplate, {
            // Add your data here
        });
        throw new Error("Not implemented");
    });
}
