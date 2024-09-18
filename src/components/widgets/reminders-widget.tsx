import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function RemindersWidget() {
  return (
    <Card className="col-span-1 row-span-1 overflow-hidden relative">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside text-sm">
          <li>Fast on Monday</li>
          <li>Read Surah Al-Kahf on Friday</li>
        </ul>
        <Button variant="outline" className="mt-2">
          <Bell className="mr-2 h-4 w-4" /> Set Reminder
        </Button>
      </CardContent>
      <div className="absolute -bottom-10 -right-10 opacity-10">
        <Bell className="h-32 w-32" />
      </div>
    </Card>
  );
}
