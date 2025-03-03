import { AppType } from "./";
import { hc } from "hono/client";

const client = hc<AppType>("/");
export default client;
