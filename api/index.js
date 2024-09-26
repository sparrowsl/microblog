import { serve } from "@hono/node-server";

import app from "./app.js";
import config from "./src/config/index.js";

serve({
  fetch: app.fetch,
  port: config.PORT,
});
