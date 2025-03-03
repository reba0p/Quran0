import { Hono } from "hono";

import chapter from "./chapter";
import verse from "./verse";

const app = new Hono();

const routes = app /*  */
  .route("/chapter", chapter)
  .route("/verse", verse)

export default routes;
