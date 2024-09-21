import { BookOpen } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function QuranWidget() {
  return (
    <Card className="col-span-1 row-span-1 overflow-hidden relative">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Quran
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Last read: Surah Al-Baqarah, Verse 255</p>
        <Button variant="outline" className="mt-2">
          <BookOpen className="mr-2 h-4 w-4" /> Continue Reading
        </Button>
      </CardContent>
      <div className="absolute -bottom-10 -right-10 opacity-10">
        <BookOpen className="h-32 w-32" />
      </div>
    </Card>
  );
}
