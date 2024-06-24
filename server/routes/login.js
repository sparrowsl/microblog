import { Hono } from "hono";
import { check_login } from "../middlewares/login.js";

const app = new Hono();

app.post("/", check_login, async (c) => {
	return c.json({ data: await c.req.json() });
});

export default app;
