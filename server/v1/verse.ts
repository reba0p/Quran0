import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { TAFSEER_API_URL } from "@/constants";
import { Tafseer } from "@/types";

const app = new Hono()
  .get("/tafseer", zValidator("query", z.object({ tafseerId: z.coerce.number(), chapterId: z.coerce.number().optional(), verseId: z.coerce.number().optional() })), async (c) => {
    const { chapterId, tafseerId, verseId } = c.req.valid("query");

    try {
      const data = (await fetch(`${TAFSEER_API_URL}/${tafseerId}/${chapterId}/${verseId}`).then((res) => res.json())) as Tafseer;
      return c.json(data);
    } catch (error: any) {
      const t = await getTranslations("General");
      return c.json({ message: t("fail"), cause: error?.message }, 400);
    }
  });

export default app;