import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BookmarkIcon } from "lucide-react";
import { JuzsReference } from "./types";

export const JuzCard = ({ juz }: { juz: JuzsReference }) => {
  const surahRange = juz.start.chapter === juz.end.chapter
    ? `Surah ${juz.start.chapter}`
    : `Surah ${juz.start.chapter}-${juz.end.chapter}`;

  return (
    <Card className="h-48 flex flex-col justify-between">
      <CardHeader className="flex flex-row">
        <div className="gap-2 flex flex-col">
          <CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-left">{juz.name}</TooltipTrigger>
                <TooltipContent>
                  <p className="font-arabic">{juz.translation}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>
            {surahRange}, Juz {juz.juz}
          </CardDescription>
        </div>
        <Button className="ml-auto" size="sm" variant="ghost">
          <BookmarkIcon />
          <span className="sr-only">Bookmark</span>
        </Button>
      </CardHeader>
      <CardContent className="flex justify-between w-full">
        <p className="">{juz.name_complex}</p>
        <p className="font-arabic text-right">{juz.arabic_name}</p>
      </CardContent>
    </Card>
  );
};
