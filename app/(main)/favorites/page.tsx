"use client"
import CHAPTERS_LIST from "@/data/chapters-list.json"
import useGetFavoriteChaptersIds from "@/client/chapter/api/use-get-favorite-chapters-ids"
import ChapterCard from "@/client/chapter/components/chapter-card"
import { useLocale, useTranslations } from "next-intl"
import type { Locale } from "@/i18n.config"
import useUpdateSearchParams from "@/hooks/use-update-search-params"
import { Skeleton } from "@/components/ui/skeleton"
import ErrorCard from "@/components/error-card"
import NoData from "@/components/no-data"
import SearchFor from "@/components/search-for"

export default function FavoritesPage() {
  const t = useTranslations("MainLayout.Navbar");
  const favoriteChaptersQuery = useGetFavoriteChaptersIds()
  const locale = useLocale() as Locale

  const { searchParams } = useUpdateSearchParams()
  const search = (searchParams.get("search") || "").toLocaleLowerCase()

  if (favoriteChaptersQuery.isLoading || favoriteChaptersQuery.isPending) return <LoadingSkeleton />
  if (favoriteChaptersQuery.isError) return <ErrorCard />

  const favoriteIds = favoriteChaptersQuery.data.map(({ chapterId }) => chapterId)
  const chapters = CHAPTERS_LIST.filter((chapter) => favoriteIds.includes(chapter.id))
  const searchFilterChapters = chapters.filter(
    (chapter) =>
      chapter.name["ar"].includes(search) ||
      chapter.name["en"].toLocaleLowerCase().includes(search) ||
      chapter.transliterationName.toLocaleLowerCase().includes(search),
  )

  if (searchFilterChapters.length === 0) return <NoData />

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
    <div className="flex items-center justify-between mb-4">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <div className="h-9 w-1.5 rounded-full bg-primary" />
          {t("favorites")}
        </h1>
      </div>
      {!!search && <SearchFor text={search} />}
      {searchFilterChapters.map((chapter) => (
        <ChapterCard
          key={chapter.id}
          id={chapter.id}
          name={chapter.name[locale]}
          transliterationName={chapter.transliterationName}
          type={chapter.type as "meccan" | "medinan"}
          versesCount={chapter.totalVerses}
          isFavorite={true} // These are already favorites
        />
      ))}
    </div>
  )
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
    <Skeleton className="h-40 w-full" />
    <Skeleton className="h-40 w-full" />
  </div>
)

