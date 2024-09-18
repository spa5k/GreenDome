import { PauseCircle, PlayCircle, Volume2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function RecitationWidget() {
  return (
    <Card className="col-span-1 row-span-1 overflow-hidden relative">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Volume2 className="mr-2 h-5 w-5" />
          Recitation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm">Surah Yaseen</p>
          <Button
            variant="ghost"
            size="icon"
            // onClick={() => setIsPlaying(!isPlaying)}
          >
            {true ? <PauseCircle className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
          </Button>
        </div>
      </CardContent>
      <div className="absolute -bottom-10 -right-10 opacity-10">
        <Volume2 className="h-32 w-32" />
      </div>
    </Card>
  );
}
