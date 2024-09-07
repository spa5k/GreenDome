import { Button } from "@/components/ui/button";
import { useAudio } from "@/providers/AudioProvider";
import { FastForwardIcon, PauseIcon, PlayIcon, RewindIcon } from "lucide-react";

interface ControlsProps {
  audioUrl: string | undefined;
}

export const RecitationControls = ({ audioUrl }: ControlsProps) => {
  const { isPlaying, play, pause, seek, currentTime, duration } = useAudio();

  const handleRewind = () => {
    if (!currentTime || !duration) {
      return;
    }

    const newTime = Math.max(currentTime - 10, 0);
    seek(newTime / duration);
  };

  const handleFastForward = () => {
    if (!currentTime || !duration) {
      return;
    }

    const newTime = Math.min(currentTime + 10, duration);
    seek(newTime / duration);
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <Button onClick={handleRewind} disabled={!audioUrl}>
        <RewindIcon />
      </Button>
      <Button
        onClick={isPlaying ? () => pause() : () => play(audioUrl!)}
        disabled={!audioUrl}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <Button onClick={handleFastForward} disabled={!audioUrl}>
        <FastForwardIcon />
      </Button>
    </div>
  );
};
