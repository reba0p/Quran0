
import { Hono } from "hono";
import { logger } from "hono/logger";
import v1 from "./v1";

const app = new Hono().basePath("/api");

app.all("*", logger());
app.use("/*", logger());
// protect all routes
// app.use("/*", verifyAuth());

const routes = app.route("/v1", v1);

export type AppType = typeof routes;
export default app;


