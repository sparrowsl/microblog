import { Hono } from "hono";
import { logger } from "hono/logger";
import posts from "./routes/posts.js";

const app = new Hono();
app.use(logger());

app.get("/", (c) => c.json({ message: "Microblog API!" }));

app.route("/posts", posts);

app.get("*", (c) => c.json({ message: "Invalid API endpoint" }));

export default app;
