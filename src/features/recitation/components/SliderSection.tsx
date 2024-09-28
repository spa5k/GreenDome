"use client";

import { Slider } from "@/components/ui/slider";
import { useAudio } from "@/providers/AudioProvider";
import { useEffect, useState } from "react";
import { useAyah } from "../hooks/useRecitationHooks";
import type { Timings } from "../types/timingTypes";

interface SliderSectionProps {
  audioUrl: string;
  timings: Timings;
}

export const SliderSection = ({
  audioUrl,
  timings,
}: SliderSectionProps) => {
  const [step, setStep] = useState(0);

  const [ayah, setAyah] = useAyah();

  const {
    isPlaying,
    play,
    progress,
    seek,
    error: audioError,
    currentTime,
  } = useAudio();
  const [sliderValue, setSliderValue] = useState(progress * 100);

  useEffect(() => {
    if (!timings) {
      return;
    }
    if (audioUrl && ayah && isPlaying) {
      play(audioUrl);
    }

    const currentAyahTimings = timings.audio_files[0].verse_timings[Number(ayah) - 1].timestamp_from;

    const seekPercentage = currentAyahTimings / timings.audio_files[0].duration;
    seek(seekPercentage);
  }, [ayah]);

  useEffect(() => {
    setSliderValue(progress * 100);
    if (!timings || !currentTime) {
      return;
    }
    const currentStep = timings?.audio_files[0].verse_timings.findIndex(
      (timing) =>
        timing.timestamp_from <= currentTime * 1000
        && timing.timestamp_to >= currentTime * 1000,
    );
    setStep(currentStep! + 1);
    setAyah((currentStep! + 1).toString());
  }, [currentTime, progress, timings]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
    seek(value[0] / 100);
  };

  if (audioError) {
    return <div>Error: {audioError}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Slider
        value={[sliderValue]}
        onValueChange={handleSliderChange}
        max={100}
        step={10}
        disabled={!audioUrl}
        className="transition-all w-full cursor-pointer"
      />
    </div>
  );
};
