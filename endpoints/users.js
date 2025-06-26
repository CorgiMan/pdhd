const usersTemplate = `
    <h2 class="text-2xl font-bold mb-4">Users</h2>
    
    <form method="POST" action="/users" class="mb-8">
        <div class="flex space-x-4 mb-4">
            <div class="flex-1">
                <label class="block">Name:</label>
                <input type="text" name="name" required class="border p-2 rounded w-full">
            </div>
            <div class="flex-1">
                <label class="block">Email:</label>
                <input type="email" name="email" required class="border p-2 rounded w-full">
            </div>
            <div class="flex-1 flex items-end">
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
                    Add User
                </button>
            </div>
        </div>
    </form>

    <table class="min-w-full border-collapse">
        <thead>
            <tr class="bg-gray-100">
                <th class="border p-2 text-left">Name</th>
                <th class="border p-2 text-left">Email</th>
                <th class="border p-2 text-left">Session Expires</th>
            </tr>
        </thead>
        <tbody>
            <% it.users.forEach(function(user){ %>
                <tr>
                    <td class="border p-2"><%= user.name %></td>
                    <td class="border p-2"><%= user.email %></td>
                    <td class="border p-2"><%= user.expiresAt || '-' %></td>
                </tr>
            <% }) %>
        </tbody>
    </table>
`;

export function usersView(router, { db }) {
    router.get("/users", async (ctx) => {
        const users = await db.fetch({
            email: db.user.email,
            name: db.user.name,
            expiresAt: db.userSession.expiresAt,
        });
        ctx.response.render(usersTemplate, {
            users,
        });
    });

    router.post("/users", async (ctx) => {
        const body = await ctx.request.body().value;
        const { name, email } = Object.fromEntries(body);
        await db.insert(db.user).values({ name, email });
        ctx.response.redirect("/users");
    });
}
