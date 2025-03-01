export type Locale = (typeof locales)[number];

export const locales = ["ar", "en", "ku"] as const;
export const defaultLocale: Locale = "en";
