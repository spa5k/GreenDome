import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export const CalendarWidget = () => {
  return (
    <Card className="col-span-1 row-span-1 overflow-hidden relative">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Islamic Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold mb-1">15 Ramadan, 1444 AH</p>
        <p className="text-sm mb-2">Upcoming: Laylat al-Qadr</p>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" className="w-full">
              <CalendarIcon className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Islamic Calendar</DialogTitle>
              <DialogDescription>
                This is the Islamic Calendar
                <Calendar className="w-full" />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
      <div className="absolute -bottom-10 -right-10 opacity-10">
        <CalendarIcon className="h-32 w-32" />
      </div>
    </Card>
  );
};
