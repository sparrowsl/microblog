import { Hono } from "hono";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";

import auth from "./src/routes/auth.js";
import posts from "./src/routes/posts.js";
import users from "./src/routes/users.js";

const app = new Hono();
app.use(logger());
app.use(trimTrailingSlash());

app.get("/", (c) => c.json({ message: "Microblog API!" }));

app.route("/posts", posts);
app.route("/auth", auth);
app.route("/users", users);

app.get("*", (c) => c.json({ message: "Invalid API endpoint" }));

export default app;
