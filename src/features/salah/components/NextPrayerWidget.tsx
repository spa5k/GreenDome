"use client";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import { getPrayerTimes, useLocationStore } from "../store/salahStore";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export const NextPrayerWidget = () => {
  const { prayerTimes, meta, sunnahTimes } = useLocationStore();
  const [nextPrayer, setNextPrayer] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  const [nextPrayerTime, setNextPrayerTime] = useState("");
  const [currentPrayer, setCurrentPrayer] = useState("");

  useEffect(() => {
    if (!(prayerTimes && meta && sunnahTimes)) {
      return;
    }
    const calculateNextPrayer = () => {
      const now = dayjs().tz(meta.timezone);
      const prayers = [
        { name: "Fajr", time: dayjs(prayerTimes.fajr).tz(meta.timezone) },
        { name: "Sunrise", time: dayjs(prayerTimes.sunrise).tz(meta.timezone) },
        { name: "Dhuhr", time: dayjs(prayerTimes.dhuhr).tz(meta.timezone) },
        { name: "Asr", time: dayjs(prayerTimes.asr).tz(meta.timezone) },
        { name: "Maghrib", time: dayjs(prayerTimes.maghrib).tz(meta.timezone) },
        { name: "Isha", time: dayjs(prayerTimes.isha).tz(meta.timezone) },
        { name: "Last Third of the Night", time: dayjs(sunnahTimes.lastThirdOfTheNight).tz(meta.timezone) },
        { name: "Midnight", time: dayjs(sunnahTimes.middleOfTheNight).tz(meta.timezone) },
      ];

      const prayerDetails = getPrayerTimes();

      const currentPrayerName = prayerDetails?.prayerTimes.currentPrayer();
      const nextPrayerName = prayerDetails?.prayerTimes.nextPrayer();
      const timeForNextPrayer = prayers.find((prayer) => prayer.name.toLowerCase() === nextPrayerName)?.time;
      const currentPrayerDetails = prayers.find((prayer) => prayer.name.toLowerCase() === currentPrayerName);

      if (currentPrayerDetails) {
        setCurrentPrayer(currentPrayerDetails.name);
      }

      if (!timeForNextPrayer) {
        return;
      }
      setNextPrayer(nextPrayerName!);
      setNextPrayerTime(timeForNextPrayer.format("h:mm A"));
      const diff = timeForNextPrayer.diff(now);
      const duration = dayjs.duration(diff);
      const hours = duration.hours();
      const minutes = duration.minutes();
      setTimeRemaining(`${hours}hr ${minutes}mins`);
    };

    calculateNextPrayer();
    const interval = setInterval(calculateNextPrayer, 60_000); // Update every minute

    return () => clearInterval(interval);
  }, [prayerTimes, meta, sunnahTimes]);

  return (
    <div className="h-[200px] w-full transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_60%)] sm:left-40 p-5">
      <div>
        Current prayer: <span className="text-2xl font-semibold">{currentPrayer}</span>
      </div>
      <div>
        Next prayer in <span className="text-2xl font-semibold">{timeRemaining}</span> ({nextPrayer} at{" "}
        {nextPrayerTime})
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">Fajr</span>
          <span className="text-lg">{dayjs(prayerTimes?.fajr).tz(meta?.timezone).format("h:mm A")}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">Sunrise</span>
          <span className="text-lg">{dayjs(prayerTimes?.sunrise).tz(meta?.timezone).format("h:mm A")}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">Dhuhr</span>
          <span className="text-lg">{dayjs(prayerTimes?.dhuhr).tz(meta?.timezone).format("h:mm A")}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">Asr</span>
          <span className="text-lg">{dayjs(prayerTimes?.asr).tz(meta?.timezone).format("h:mm A")}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">Maghrib</span>
          <span className="text-lg">{dayjs(prayerTimes?.maghrib).tz(meta?.timezone).format("h:mm A")}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">Isha</span>
          <span className="text-lg">{dayjs(prayerTimes?.isha).tz(meta?.timezone).format("h:mm A")}</span>
        </div>
      </div>
    </div>
  );
};
