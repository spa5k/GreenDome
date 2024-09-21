import { Compass } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function PrayerWidget() {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-r from-blue-500 to-green-500 text-white">
      <Link href="/prayers">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Compass className="mr-2 h-6 w-6" />
            Prayer Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">Asr</p>
              <p>Current Prayer</p>
            </div>
            <div>
              <p className="text-2xl font-bold">Maghrib</p>
              <p>Next Prayer in 2:30</p>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
