import { Hono } from "hono";
import { logger } from "hono/logger";
import posts from "./routes/posts.js";

const app = new Hono();
app.use(logger());

app.get("/", (c) => c.text("Hello Hono!"));
app.route("/posts", posts);

export default app;
