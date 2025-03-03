// fetchTranslation.ts
import { useQuery } from "@tanstack/react-query";

async function fetchTranslationData(surahNumber?: number) {
  if (!surahNumber) return null; // Handle undefined case

  try {
    const response = await fetch(`https://quranenc.com/api/v1/translation/sura/kurdish_bamoki/${surahNumber}`);
    const data = await response.json();
    
    console.log("API Response:", data); // Debugging log

    if (data && data.result && Array.isArray(data.result)) {
      return data.result.map((ayah: any) => ayah.translation || "").join(" ");
    }
  } catch (error) {
    console.error("Error fetching translation:", error);
    return null;
  }
}

export function useFetchTranslation(surahNumber?: number) {
  return useQuery({
    queryKey: ["translation", surahNumber],
    queryFn: () => fetchTranslationData(surahNumber),
    enabled: !!surahNumber,
  });
}
