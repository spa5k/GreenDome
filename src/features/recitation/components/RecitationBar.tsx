"use client";

import ErrorBoundary from "@/components/generic/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/providers/AudioProvider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { fetchTimings } from "../api/timings";
import { reciters } from "../data/reciters";
import { useAyah, useReciter } from "../hooks/useRecitationHooks";
import { timeFormatter } from "../utils/timeFormatter";
import { AvatarSection } from "./RecitationAvatar";
import { RecitationControls } from "./RecitationControls";
import { SliderSection } from "./SliderSection";
import { VolumeControl } from "./VolumeSlider";

export function RecitationBar() {
  const {
    error: audioError,
    currentTime,
    duration,
  } = useAudio();

  const params = useParams() as { surahId: string };
  const surah = params.surahId;

  const [currentReciter, setReciter] = useReciter();
  const reciter = useMemo(
    () => reciters.find((reciter) => reciter.slug === currentReciter),
    [currentReciter],
  );

  const [ayah, setAyah] = useAyah();

  const {
    data: timings,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["timings", reciter, surah, reciter?.slug],
    queryFn: () => {
      if (!reciter || !surah) {
        throw new Error("Reciter or Surah is undefined");
      }
      return fetchTimings(reciter.slug, parseInt(surah, 10), reciter.style);
    },
    enabled: !!reciter && !!surah,
  });

  const audioUrl = useMemo(() => timings?.audio_files[0].audio_url, [timings]);

  if (!surah || !ayah) {
    console.log("Missing Surah or Ayah information.");
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-lg border p-6 w-full mx-auto flex flex-col gap-4">
        <div className="text-red-500">Error: Missing Surah or Ayah information.</div>
      </div>
    );
  }

  if (error || audioError) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-lg border p-6 w-full mx-auto flex flex-col gap-4">
        <div className="text-red-500">Error: {JSON.stringify(error || audioError)}</div>
        <Button onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  if (isLoading || !timings) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-lg border p-6 w-full mx-auto flex flex-col gap-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-lg border w-full mx-auto flex flex-col gap-4 pt-0">
      <ErrorBoundary>
        <SliderSection
          audioUrl={audioUrl!}
          timings={timings}
        />
      </ErrorBoundary>
      <div className="flex flex-col gap-4 px-6 pb-6">
        <ErrorBoundary>
          <div className="flex flex-row items-center justify-between mr-5">
            <p>{Number.isNaN(currentTime!) ? "00:00" : timeFormatter(currentTime!)}</p>
            <p>{Number.isNaN(duration!) ? "00:00" : timeFormatter(duration!)}</p>
          </div>
          <p className="text-sm text-muted-foreground">Ayah {ayah} of {surah}</p>
        </ErrorBoundary>
        <div className="flex justify-between">
          <AvatarSection name={reciter?.name!} currentReciter={currentReciter!} />
          <div className="flex flex-row items-center gap-4">
            <ErrorBoundary>
              <RecitationControls audioUrl={audioUrl} />
            </ErrorBoundary>
          </div>
          <VolumeControl audioUrl={audioUrl} />
        </div>
      </div>
    </div>
  );
}
