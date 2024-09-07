"use client";

import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPrayerTimes, useLocationStore } from "../store/salahStore";
import { LocationFetcher } from "./LocationFetcher";

dayjs.extend(utc);
dayjs.extend(timezone);

export const MiniSalahWidget = () => {
  const {
    prayerTimes,
    meta,
    playAdhan,
    latitude: currentLatitude,
    rehydrated,
    sunnahTimes,
    longitude: currentLongitude,
  } = useLocationStore();
  const [currentPrayer, setCurrentPrayer] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");
  const [currentPrayerTime, setCurrentPrayerTime] = useState("");
  const [nextPrayerTime, setNextPrayerTime] = useState("");
  const [progress, setProgress] = useState(0);
  const adhanAudioRef = useRef<HTMLAudioElement>(null);

  const path = usePathname();

  const showNotification = (prayerName: string) => {
    if (Notification.permission === "granted") {
      new Notification("Prayer Time", {
        body: `It's time for ${prayerName} prayer.`,
        icon: "/aqsa.jpg",
      });
    }
  };

  const isAdhanPlayed = (prayerName: string) => {
    const playedPrayers = JSON.parse(localStorage.getItem("playedPrayers") || "[]");
    return playedPrayers.includes(prayerName);
  };

  const markAdhanAsPlayed = (prayerName: string) => {
    const playedPrayers = JSON.parse(localStorage.getItem("playedPrayers") || "[]");
    playedPrayers.push(prayerName);
    localStorage.setItem("playedPrayers", JSON.stringify(playedPrayers));
  };

  const calculateCurrentPrayer = useCallback(() => {
    if (!(prayerTimes && meta && sunnahTimes)) {
      return;
    }

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

    let currentPrayerName = prayerDetails?.prayerTimes.currentPrayer() as string;
    const nextPrayerName = prayerDetails?.prayerTimes.nextPrayer();
    let timeForNextPrayer = prayers.find((prayer) => prayer.name.toLowerCase() === nextPrayerName)?.time;
    let currentPrayerDetails = prayers.find((prayer) => prayer.name.toLowerCase() === currentPrayerName);

    if (currentPrayerName === "none" && nextPrayerName === "fajr") {
      currentPrayerName = "Midnight";
      currentPrayerDetails = prayers.find((prayer) => prayer.name === "Midnight");
    }

    setCurrentPrayer(currentPrayerName!);
    setNextPrayer(nextPrayerName!);
    setCurrentPrayerTime(currentPrayerDetails?.time.format("h:mm A")!);
    setNextPrayerTime(timeForNextPrayer?.format("h:mm A")!);

    if (currentPrayerName === "isha" && nextPrayerName === "none") {
      setNextPrayer("Last Third of the Night");
      setNextPrayerTime(prayers.find((prayer) => prayer.name === "Last Third of the Night")?.time.format("h:mm A")!);
      timeForNextPrayer = prayers[6].time;
    }

    const totalDuration = timeForNextPrayer?.diff(currentPrayerDetails?.time);
    const elapsedDuration = now.diff(currentPrayerDetails?.time);
    const progressPercentage = (elapsedDuration / totalDuration!) * 100;

    setProgress(progressPercentage);

    if (
      !(playAdhan && adhanAudioRef.current && !isAdhanPlayed(currentPrayerName!)
        && now.isSame(currentPrayerDetails?.time, "minute")
        && (currentPrayerName !== "none" && currentPrayerName !== "sunrise"))
    ) {
      return;
    }
    adhanAudioRef.current.play();
    showNotification(currentPrayerName!);
    markAdhanAsPlayed(currentPrayerName!);
  }, [prayerTimes, meta, sunnahTimes, playAdhan]);

  useEffect(() => {
    if (rehydrated && !currentLatitude && !currentLongitude) {
      return;
    }

    calculateCurrentPrayer();
    const interval = setInterval(calculateCurrentPrayer, 60_000);

    return () => clearInterval(interval);
  }, [calculateCurrentPrayer, rehydrated, currentLatitude, currentLongitude]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!(adhanAudioRef.current && navigator.mediaSession)) {
      return;
    }
    navigator.mediaSession.setActionHandler("play", () => {
      adhanAudioRef.current?.play();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      adhanAudioRef.current?.pause();
    });

    adhanAudioRef.current.addEventListener("play", () => {
      navigator.mediaSession.playbackState = "playing";
    });

    adhanAudioRef.current.addEventListener("pause", () => {
      navigator.mediaSession.playbackState = "paused";
    });
  }, [adhanAudioRef]);

  if (!prayerTimes && (!currentLongitude || !currentLatitude)) {
    return (
      <div className="flex items-center justify-center">
        {path == "/salah" || (
          <Link href={"/salah"} prefetch={false}>
            <Button className="px-4 py- rounded-md">Add location</Button>
          </Link>
        )}
      </div>
    );
  }

  if (!currentPrayer || !nextPrayer) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <Link href={"/salah"} prefetch={false}>
      <LocationFetcher />
      <div className="flex items-center justify-center w-full text-secondary-foreground">
        <div className="relative w-full bg-gray-200 dark:bg-gray-900 rounded-md overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-green-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-green-400 opacity-50"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ repeat: Infinity, duration: 5, ease: "anticipate" }}
          />
          <div className="relative z-10 text-center flex items-center justify-between p-2">
            <div className="flex text-center items-center gap-4">
              <p className="text-sm font-bold sm:text-xl ">
                {currentPrayer.charAt(0).toUpperCase() + currentPrayer.slice(1)}
              </p>
              <p className="hidden sm:flex">{currentPrayerTime}</p>
            </div>
            <div className="flex text-center items-center gap-4 dark:text-primary">
              <p className="text-sm font-bold sm:text-xl ">
                {nextPrayer.charAt(0).toUpperCase() + nextPrayer.slice(1)}
              </p>
              <p className="hidden sm:flex">{nextPrayerTime}</p>
            </div>
          </div>
        </div>
      </div>
      <audio ref={adhanAudioRef} src="/adhan1.mp3" />
    </Link>
  );
};
