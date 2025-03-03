import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getTranslations } from "next-intl/server";

const app = new Hono()
  .get("/favorites", async (c) => {
    const t = await getTranslations("General");

    try {
      // Dummy response as DB is removed
      return c.json({ message: t("success"), data: [] });
    } catch (error) {
      return c.json({ message: t("fail"), cause: error }, 400);
    }
  })
  .post(
    "/favorites",
    zValidator("json", z.object({ chapterId: z.coerce.number() })),
    async (c) => {
      const t = await getTranslations("General");

      try {
        // Dummy response as DB is removed
        return c.json({ message: t("success") });
      } catch (error) {
        return c.json({ message: t("fail"), cause: error }, 400);
      }
    }
  );

export default app;
