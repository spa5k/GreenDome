"use client";

import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAudio } from "@/providers/AudioProvider";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAyah } from "../hooks/useAyah";
import type { Timings } from "../types/timingTypes";
import { timeFormatter } from "../utils/timeFormatter";

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

  const verseTimings = timings.audio_files[0].verse_timings;
  const totalDuration = timings.audio_files[0].duration;

  const totalSteps = verseTimings.length;
  let interval = 1;
  if (totalSteps > 10) {
    if (totalSteps <= 30) {
      interval = Math.ceil(totalSteps / 15);
    } else if (totalSteps <= 50) {
      interval = Math.ceil(totalSteps / 20);
    } else if (totalSteps <= 100) {
      interval = Math.ceil(totalSteps / 30);
    } else if (totalSteps <= 200) {
      interval = Math.ceil(totalSteps / 50);
    } else if (totalSteps <= 500) {
      interval = Math.ceil(totalSteps / 100);
    }
  }

  if (audioError) {
    return <div>Error: {audioError}</div>;
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center w-full">
        <Slider
          value={[sliderValue]}
          onValueChange={handleSliderChange}
          max={100}
          step={10}
          disabled={!audioUrl}
          className="transition-all "
        />
        <div className="mt-[-21px] flex flex-row justify-between w-full relative">
          {verseTimings.map((timing, index) => {
            if (index % interval !== 0 && index !== 0 && index !== totalSteps - 1) {
              return null;
            }
            const position = (timing.timestamp_from / totalDuration) * 100;
            const nextPosition = index < verseTimings.length - 1
              ? (verseTimings[index + 1].timestamp_from
                / totalDuration)
                * 100
              : 100;

            const isCurrentStep = step === index + 1;

            return (
              <Tooltip key={`step-${index}`}>
                <TooltipTrigger
                  className={clsx(
                    "absolute text-sm",
                    isCurrentStep && "text-primary",
                    !isCurrentStep
                      && "text-muted-foreground text-10 opacity-10",
                  )}
                  style={{ left: `${position}%` }}
                  onClick={() => {
                    setAyah((index + 1).toString());
                  }}
                >
                  <span
                    className={clsx(
                      "absolute text-sm transition-colors duration-200",
                      isCurrentStep && "text-primary",
                      !isCurrentStep
                        && "text-muted-foreground text-10 opacity-40",
                      "hover:font-extrabold hover:scale-110 hover:opacity-100 z-0",
                    )}
                    style={{ left: `${position}%` }}
                    role="presentation"
                  >
                    {"▏"}
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  style={{ left: `${position}%` }}
                  role="tooltip"
                >
                  <p>
                    {`Ayah ${index + 1}, Time: ${
                      timeFormatter(
                        timing.timestamp_from / 1000,
                      )
                    }`}
                  </p>
                </TooltipContent>
                {isCurrentStep && (
                  <div
                    className="absolute bg-primary opacity-20"
                    style={{
                      left: `${position}%`,
                      width: `${nextPosition - position}%`,
                      height: "2px",
                      top: "50%",
                    }}
                  />
                )}
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};
