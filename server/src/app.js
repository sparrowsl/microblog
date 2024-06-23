import { Hono } from "hono";
import { logger } from "hono/logger";
import posts from "./routes/posts.js";
import login from "./routes/login.js";

const app = new Hono();
app.use(logger());

app.get("/", (c) => c.json({ message: "Microblog API!" }));

app.route("/posts", posts);
app.route("/login", login);

app.get("*", (c) => c.json({ message: "Invalid API endpoint" }));

export default app;
