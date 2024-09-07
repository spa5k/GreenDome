"use client";

import { isLocalhostReachable } from "@/features/quran/api/ayah";
import { useEffect, useState } from "react";

// Custom hook to check if the app is running in Electron
function useIsElectron() {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && /Electron/.test(navigator.userAgent)) {
      setIsElectron(true);
    } else {
      setIsElectron(false);
    }
  }, []);

  return isElectron;
}

export function ElectronIndicator() {
  const isElectron = useIsElectron();
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    async function checkLocalhost() {
      const reachable = await isLocalhostReachable();
      setIsLocalhost(reachable);
    }

    checkLocalhost();
  }, []);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div>
      <div
        className="fixed bottom-0 left-1 z-50 flex items-center space-x-2 rounded-full bg-black px-2.5 py-1 font-mono text-xs font-medium text-white"
        title="Is this running in Electron?"
      >
        Electron - {isElectron ? "Yes" : "No"}
      </div>
      <div
        className="fixed bottom-20 left-1 z-50 flex items-center space-x-2 rounded-full bg-black px-2.5 py-1 font-mono text-xs font-medium text-white"
        title="Is localhost reachable?"
      >
        Localhost - {isLocalhost ? "Yes" : "No"}
      </div>
    </div>
  );
}
