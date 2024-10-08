import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";

import auth from "./src/routes/auth.js";
import posts from "./src/routes/posts.js";
import users from "./src/routes/users.js";

const app = new Hono({ strict: false });
app.use(logger());
app.use(cors({ origin: "*" }));
app.use(trimTrailingSlash());

app.get("/", (c) => c.json({ message: "Microblog API!" }));

app.route("/", posts);
app.route("/", auth);
app.route("/", users);

app.all("*", (c) => c.json({ message: "Invalid API endpoint" }));

export default app;
