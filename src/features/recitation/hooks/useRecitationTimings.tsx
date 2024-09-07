import { useQuery } from "@tanstack/react-query";
import type { Timings } from "../types/timingTypes";

const fetchTimings = async (style: string, slug: string, surah: number): Promise<Timings> => {
  const response = await fetch(
    `https://raw.githubusercontent.com/spa5k/quran_timings_api/master/data/${style}/${slug}/${surah}.json`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useTimings = (style: string, slug: string, surah: number) => {
  return useQuery({
    queryKey: ["timings", style, slug, surah],
    queryFn: () => fetchTimings(style, slug, surah),
  });
};
