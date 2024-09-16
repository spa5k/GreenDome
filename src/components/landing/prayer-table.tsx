import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckIcon } from "lucide-react";
import { Button } from "../ui/button";

const prayerTimes = [
  { name: "Fajr", time: "05:30 AM" },
  { name: "Dhuhr", time: "12:30 PM" },
  { name: "Asr", time: "03:45 PM" },
  { name: "Maghrib", time: "06:30 PM" },
  { name: "Isha", time: "08:00 PM" },
];

export default function PrayerTimelineTable() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const getCurrentPrayer = () => {
    const timeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
    for (let i = prayerTimes.length - 1; i >= 0; i--) {
      if (timeString >= prayerTimes[i].time.slice(0, 5)) {
        return i;
      }
    }
    return -1;
  };

  const currentPrayerIndex = getCurrentPrayer();

  return (
    <Card className="w-full max-w-md mx-auto h-[150px]">
      {
        /* <CardHeader>
        <CardTitle className="text-xl font-bold text-green-800 dark:text-green-100 flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Prayer Times
        </CardTitle>
      </CardHeader> */
      }
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Prayer</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prayerTimes.map((prayer, index) => (
              <TableRow
                key={prayer.name}
                className={index === currentPrayerIndex ? "bg-green-50 dark:bg-green-900" : ""}
              >
                <TableCell className="font-medium">{prayer.name}</TableCell>
                <TableCell>{prayer.time}</TableCell>
                <TableCell className="text-right">
                  {index === currentPrayerIndex
                    ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-100">
                        Current
                      </span>
                    )
                    : index < currentPrayerIndex
                    ? <span className="text-gray-500 dark:text-gray-400">Passed</span>
                    : <span className="text-gray-500 dark:text-gray-400">Upcoming</span>}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <CheckIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
