const commentsTemplate = `
    <h2 class="text-2xl font-bold mb-4">Comments</h2>
    Add comments here
`;

export function commentsView(router) {
    router.get("/comments", async (ctx) => {
        // Implement your comments logic here
        ctx.response.render(commentsTemplate, {
            // Add your data here
        });
    });
}
