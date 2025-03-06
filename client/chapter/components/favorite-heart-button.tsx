"use client"

import type React from "react"

import { Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Spinner from "@/components/spinner"
import { cn } from "@/lib/utils"

type FavoriteHeartButtonProps = {
  chapterId: number
  initialIsFavorite?: boolean
}

export default function FavoriteHeartButton({ chapterId, initialIsFavorite = false }: FavoriteHeartButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  // Check localStorage on mount to get the current favorite status
  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favoriteChapters") || "[]")
      setIsFavorite(favorites.includes(chapterId))
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error)
    }
  }, [chapterId])

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    // Prevent the click from propagating to the Link component
    e.stopPropagation()
    e.preventDefault()

    try {
      setIsPending(true)

      // Get current favorites from localStorage
      const favorites = JSON.parse(localStorage.getItem("favoriteChapters") || "[]")

      // Toggle favorite status
      let newFavorites
      if (favorites.includes(chapterId)) {
        newFavorites = favorites.filter((id: number) => id !== chapterId)
        setIsFavorite(false)
      } else {
        newFavorites = [...favorites, chapterId]
        setIsFavorite(true)
      }

      // Save to localStorage
      localStorage.setItem("favoriteChapters", JSON.stringify(newFavorites))

      // Refresh the page to update the UI
      router.refresh()
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      onClick={handleToggleFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      disabled={isPending}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <Heart className={cn("text-muted-foreground cursor-pointer", isFavorite && "fill-rose-500 text-rose-500")} />
      )}
    </button>
  )
}

