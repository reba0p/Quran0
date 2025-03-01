import { useQuery, useQueryClient } from "@tanstack/react-query";

import { handleErrors } from "@/lib/errors";
import { QURAN_JSON_API_URL } from "@/constants";
import { Locale } from "@/i18n.config";
import { Chapter } from "@/types";
import { useLocale } from "next-intl";
import { useEffect } from "react";

export default function useGetChapter(id: string) {
  const locale = useLocale() as Locale;
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["chapter", id, locale], // Include locale in the key
    queryFn: async () => {
      const isArabicOrKurdish = locale === "ar" || locale === "ku";
      const apiUrl = isArabicOrKurdish
        ? `${QURAN_JSON_API_URL}/chapters/${id}.json`
        : `${QURAN_JSON_API_URL}/chapters/${locale}/${id}.json`;

      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw await handleErrors(res);
      }

      return (await res.json()) as Chapter;
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["chapter", id, locale] });
  }, [locale, id, queryClient]);

  return query;
}

