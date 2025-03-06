import { Hono } from "hono";

import verse from "./verse";

const app = new Hono();

const routes = app /*  */
  .route("/verse", verse)

export default routes;
