export type Locale = (typeof locales)[number];

export const locales = ["ar", "ku", "en"] as const;
export const defaultLocale: Locale = "en";
