import type { Timings } from "../types/timingTypes";

export const fetchTimings = async (
  reciterSlug: string,
  surah: number,
  style: string,
): Promise<Timings> => {
  const response = await fetch(
    `https://raw.githubusercontent.com/spa5k/quran_timings_api/master/data/${style}/${reciterSlug}/${surah}.json`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch timings data");
  }
  return response.json();
};
