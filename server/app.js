import { Hono } from "hono";
import { logger } from "hono/logger";
import auth from "./src/routes/auth.js";
import posts from "./src/routes/posts.js";

const app = new Hono();
app.use(logger());

app.get("/", (c) => c.json({ message: "Microblog API!" }));

app.route("/posts", posts);
app.route("/auth", auth);

app.get("*", (c) => c.json({ message: "Invalid API endpoint" }));

export default app;
