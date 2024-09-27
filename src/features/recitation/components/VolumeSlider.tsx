import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAudio } from "@/providers/AudioProvider";
import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useMuted } from "../hooks/useAyah";

interface VolumeControlProps {
  audioUrl: string | undefined;
}

export const VolumeControl = ({ audioUrl }: VolumeControlProps) => {
  const { volume, changeVolume } = useAudio();
  const [sliderValue, setSliderValue] = useState(volume * 100);
  // const [isMuted, setIsMuted] = useState(volume === 0);
  const [isMuted, setIsMuted] = useMuted();
  const [previousVolume, setPreviousVolume] = useState(volume);

  useEffect(() => {
    setSliderValue(volume * 100);
    setIsMuted(volume === 0);
  }, [volume]);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setSliderValue(value[0]);
    changeVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (newVolume !== 0) {
      setPreviousVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      changeVolume(previousVolume);
      setSliderValue(previousVolume * 100);
    } else {
      setPreviousVolume(volume);
      changeVolume(0);
      setSliderValue(0);
    }
    setIsMuted(!isMuted);
  };

  const increaseVolume = () => {
    const newVolume = Math.min(volume + 0.1, 1);
    changeVolume(newVolume);
    setSliderValue(newVolume * 100);
  };

  return (
    <div className="flex flex-row items-center gap-4 w-[300px] justify-between">
      <Button onClick={toggleMute} disabled={!audioUrl} size="icon" variant={isMuted ? "default" : "ghost"}>
        {isMuted ? <VolumeXIcon /> : <Volume1Icon />}
      </Button>
      <Slider
        value={[sliderValue]}
        onValueChange={handleVolumeChange}
        max={100}
        step={1}
        disabled={!audioUrl}
        className="w-3/5"
      />
      <Button
        onClick={increaseVolume}
        disabled={!audioUrl}
        size="icon"
        variant={volume >= 1 ? "default" : "ghost"}
      >
        <Volume2Icon />
      </Button>
    </div>
  );
};
