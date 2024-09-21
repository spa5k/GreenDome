import { Globe, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function HistoryWidget() {
  return (
    <Card className="col-span-1 row-span-1 overflow-hidden relative">
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="mr-2 h-5 w-5" />
          Islamic History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          On this day: The Prophet Muhammad (PBUH) received the first revelation of the Quran in 610 CE.
        </p>
      </CardContent>
      <div className="absolute -bottom-10 -right-10 opacity-10">
        <Globe className="h-32 w-32" />
      </div>
    </Card>
  );
}
