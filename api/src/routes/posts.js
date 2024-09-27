import { Hono } from "hono";

const app = new Hono().basePath("/posts");

const posts = [
  {
    author: { username: "John" },
    body: "Beautiful day in Portland!",
  },
  {
    author: { username: "Susan" },
    body: "The Avengers movie was so cool!",
  },
];

app.get("/", (c) => c.json({ data: { posts } }));

export default app;
