"use client"

import { useEffect, useState } from "react"

interface FavoriteChapter {
  chapterId: number
}

/**
 * Hook to get favorite chapter IDs from localStorage
 */
export default function useGetFavoriteChaptersIds() {
  const [data, setData] = useState<FavoriteChapter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const getFavorites = () => {
      try {
        setIsLoading(true)

        // Check if we're in a browser environment
        if (typeof window === "undefined") {
          setData([])
          return
        }

        // Get favorites from localStorage
        let favoriteIds: number[] = []
        try {
          favoriteIds = JSON.parse(localStorage.getItem("favoriteChapters") || "[]")
        } catch (e) {
          favoriteIds = []
        }

        // Convert to expected format
        const formattedData = favoriteIds.map((id) => ({ chapterId: id }))
        setData(formattedData)
      } catch (error) {
        console.error("Error fetching favorites:", error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getFavorites()

    // Add event listener to update favorites when localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "favoriteChapters") {
        getFavorites()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return {
    data,
    isLoading,
    isError,
    isPending,
  }
}

