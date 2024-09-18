import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function HadithWidget() {
  return (
    <Card className="col-span-1 row-span-1 overflow-hidden relative">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Hadith of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          &quot;The best among you are those who have the best manners and character.&quot; - Sahih al-Bukhari
        </p>
      </CardContent>
      <div className="absolute -bottom-10 -right-10 opacity-10">
        <BookOpen className="h-32 w-32" />
      </div>
    </Card>
  );
}
