"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

/**
 * Server action to toggle a chapter's favorite status
 * This implementation uses cookies to store favorites
 */
export async function toggleFavoriteChapter(chapterId: number) {
  try {
    // Get current favorites from cookies
    const cookieStore = cookies()
    const favoritesStr = cookieStore.get("favoriteChapters")?.value || "[]"
    let favorites: number[] = []

    try {
      favorites = JSON.parse(favoritesStr)
    } catch (e) {
      // If parsing fails, start with empty array
      favorites = []
    }

    // Toggle favorite status
    if (favorites.includes(chapterId)) {
      favorites = favorites.filter((id) => id !== chapterId)
    } else {
      favorites.push(chapterId)
    }

    // Save updated favorites to cookies
    cookieStore.set("favoriteChapters", JSON.stringify(favorites), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: true,
      sameSite: "strict",
    })

    // Revalidate the favorites page to show updated data
    revalidatePath("/favorites")

    return { success: true }
  } catch (error) {
    console.error("Error toggling favorite:", error)
    throw error
  }
}

