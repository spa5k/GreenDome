import DotPattern from "@/components/extra/dot-pattern";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ForwardIcon, PlayIcon, RewindIcon, Volume2Icon } from "lucide-react";

export function RecitationCard() {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-950 overflow-hidden">
      <DotPattern className="top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold">Surah Al-Fatihah</div>
          <div className="text-gray-500 dark:text-gray-400">1:25 / 7:00</div>
        </div>
        <div className="mb-6">
          <div className="text-gray-500 dark:text-gray-400 mb-2">Ayah 3</div>
          <div className="text-xl font-semibold">Thee (alone) we worship; Thee (alone) we ask for help.</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost">
              <RewindIcon className="w-6 h-6" />
            </Button>
            <Button size="icon" variant="ghost">
              <PlayIcon className="w-6 h-6" />
            </Button>
            <Button size="icon" variant="ghost">
              <ForwardIcon className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost">
              <Volume2Icon className="w-6 h-6" />
            </Button>
            <Slider
              className="w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-300 dark:[&>span:first-child]:bg-gray-700 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
              defaultValue={[50]}
              max={100}
              step={1}
            />
          </div>
        </div>
        <div className="mt-6">
          <Slider
            className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-300 dark:[&>span:first-child]:bg-gray-700 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
            defaultValue={[25]}
            max={100}
            step={1}
          />
          <div className="mt-2 flex items-center justify-between">
            <div className="text-gray-500 dark:text-gray-400">Ayah 3</div>
            <div className="text-gray-500 dark:text-gray-400">25%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecitationCard;
