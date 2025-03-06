import { convertToArabicNumbers } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import RANDOM_VERSES from "@/data/random-verses.json";
import useGetRandomVerse from "../api/use-get-random-verse";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n.config";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "@/components/spinner";

export default function RandomVerseCard() {
  const locale = useLocale() as Locale;
  const [randomVerseNumber, setRandomVerseNumber] = useState<number | undefined>(undefined);
  const [translation, setTranslation] = useState<string | null>(null);
  const [loadingTranslation, setLoadingTranslation] = useState<boolean>(false);
  const randomVerseQuery = useGetRandomVerse(randomVerseNumber);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * RANDOM_VERSES.length);
    setRandomVerseNumber(RANDOM_VERSES[randomIndex]);
  }, []);

  useEffect(() => {
    async function fetchTranslation() {
      setLoadingTranslation(true);
      try {
        const response = await fetch("https://api.alquran.cloud/v1/quran/ku.asan");
        const data = await response.json();

        if (data && data.data) {
          const verseData = data.data.surahs
            .flatMap((surah: any) => surah.ayahs)
            .find((ayah: any) => ayah.number === randomVerseNumber);

          if (verseData) {
            setTranslation(verseData.text);
          }
        }
      } catch (error) {
        console.error("Error fetching translation:", error);
      } finally {
        setLoadingTranslation(false);
      }
    }

    if (randomVerseNumber) {
      fetchTranslation();
    }
  }, [randomVerseNumber]);

  if (randomVerseQuery.isLoading || randomVerseQuery.isPending) return <LoadingSkeleton />;
  if (randomVerseQuery.isError) return;

  const verse = randomVerseQuery.data;

  return (
    <Link
      href={`/chapter/${verse.chapter.id}/learning?verse=${verse.number}&chapter=${verse.chapter.id}`} className="relative col-span-full overflow-hidden w-full min-h-[220px] h-fit rounded-md font-semibold flex items-center justify-center flex-col bg-primary/85 hover:bg-primary/80 dark:bg-background/85 dark:hover:bg-background/80 hover:shadow-lg shadow-md text-white text-justify p-4 mb-6">
      <Image className="absolute top-24 -right-24 opacity-40 animate-spin" style={{ animationDuration: "90s" }} width={220} height={220} src="/imgs/islamic-decorations.svg" alt="" />
      <Image className="absolute bottom-24 -left-24 opacity-40 animate-spin" style={{ animationDuration: "90s" }} width={220} height={220} src="/imgs/islamic-decorations.svg" alt="" />
      <h2 className="py-5 text-xl sm:text-2xl font-semibold" style={{ fontFamily: "uthmanic", textAlignLast: "center" }}>
        {verse.text}
        <span className="font-normal text-3xl mx-1">{convertToArabicNumbers(`${verse.number}`)}</span>
      </h2>
      {locale === "ku" && loadingTranslation ? (
        <Spinner />
      ) : locale === "ku" && translation ? (
        <p className="text-xs md:text-sm text-slate-50 text-center">{translation}</p>
      ) : locale !== "ar" && (
        <p className="text-xs md:text-sm text-slate-200 text-center">{verse.translations?.["en"]}</p>
      )}

      {locale === "ar" || locale === "ku" ? (
        <p className="block text-xs text-slate-200 font-semibold my-1">
          {verse.chapter.name} ({convertToArabicNumbers(`${verse.number}`)})
        </p>
      ) : (
        <p className="block text-xs text-slate-200 font-semibold my-1">
          {verse.chapter.transliteration} ({verse.number})
        </p>
      )}
    </Link>
  );
}

const LoadingSkeleton = () => <Skeleton className="col-span-full w-full min-h-[220px] h-fit rounded-md" />;