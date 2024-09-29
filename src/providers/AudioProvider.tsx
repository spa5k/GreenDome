"use client";

import { reciters } from "@/features/recitation/data/reciters";
import { useAyah, usePlaying, useReciter, useSurah, useVolume } from "@/features/recitation/hooks/useRecitationHooks";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = usePlaying();
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [volume, setVolume] = useVolume();
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [ayah] = useAyah();
  const [surah] = useSurah();
  const [reciter] = useReciter();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    audioRef.current = new Audio();

    if (!("mediaSession" in navigator)) {
      return;
    }

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime / audioRef.current.duration);
      }
    };

    const handleError = () => {
      setError("Error playing audio");
      setIsPlaying(false);
    };

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("error", handleError);

    // Set up Media Session API
    navigator.mediaSession.setActionHandler("play", () => {
      if (currentTrack) {
        play(currentTrack);
      }
    });
    navigator.mediaSession.setActionHandler("pause", pause);
    navigator.mediaSession.setActionHandler("stop", stop);
    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (details.seekTime && audioRef.current) {
        audioRef.current.currentTime = details.seekTime;
      }
    });

    // Add Electron event listener
    // if (window.electronAPI) {
    //   // read events from electron event update-audio-state
    //   window.electronAPI.updateAudioState((command: string) => {
    //     console.log("Received command from Electron:", command);
    //     switch (command) {
    //       case "play":
    //         if (currentTrack) {
    //           play(currentTrack);
    //         }
    //         break;
    //       case "pause":
    //         pause();
    //         break;
    //       case "stop":
    //         stop();
    //         break;
    //       default:
    //         break;
    //     }
    //   });
    // }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("error", handleError);
      }
      if ("mediaSession" in navigator) {
        navigator.mediaSession.setActionHandler("play", null);
        navigator.mediaSession.setActionHandler("pause", null);
        navigator.mediaSession.setActionHandler("stop", null);
        navigator.mediaSession.setActionHandler("seekto", null);
      }
      // Remove Electron event listener
      // if (window.electronAPI) {
      //   window.electronAPI.onAudioControl(null);
      // }
    };
  }, []);

  const reciterName = reciters.find((r) => r.slug === reciter)?.name;
  const updatePlaybackState = (state: MediaSessionPlaybackState) => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = state;
    }
  };

  useEffect(() => {
    if ("mediaSession" in navigator) {
      const image = `/surah/${surah}.webp`;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `Surah ${surah} - Ayah ${ayah}`,
        artist: reciterName,
        album: `Surah ${surah}`,
        artwork: [
          { src: image, sizes: "512x512", type: "image/webp" },
        ],
      });
    }
  }, [ayah, surah, reciter, reciterName]);

  const updateElectron = (state: "play" | "pause" | "stop") => {
    if (window.electronAPI && window.electronAPI.audioStateToElectron) {
      console.log("Updating audio state to Electron:", state);
      window.electronAPI.audioStateToElectron(state);
    }

    if (window.electronAPI && window.electronAPI.audioStateFromElectron) {
      console.log("Listening to audio state from Electron");
      window.electronAPI.audioStateFromElectron((state) => {
        console.log("Received audio state from Electron:", state);

        if (state === "play" && currentTrack) {
          play(currentTrack);
        } else if (state === "pause") {
          pause();
        } else if (state === "stop") {
          stop();
        }
      });
    }
  };

  const play = (track: string) => {
    if (audioRef.current) {
      if (currentTrack !== track) {
        audioRef.current.src = track;
        setCurrentTrack(track);
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setError(null);
        updatePlaybackState("playing");
        updateElectron("play");
      }).catch((err) => {
        setError(`Error playing audio: ${err.message}`);
        setIsPlaying(false);
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      updatePlaybackState("paused");
      updateElectron("pause");
    }
  };

  const stop = () => {
    if (!audioRef.current) {
      return;
    }
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    updatePlaybackState("none");
    updateElectron("stop");
  };

  const changeVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const seek = (newProgress: number) => {
    if (audioRef.current?.duration) {
      audioRef.current.currentTime = newProgress * audioRef.current.duration;
    }
  };

  const duration = audioRef.current?.duration;
  const currentTime = audioRef.current?.currentTime;

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrack,
        play,
        pause,
        stop,
        volume,
        changeVolume,
        progress,
        seek,
        error,
        duration,
        currentTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export interface AudioContextType {
  isPlaying: boolean;
  currentTrack: string | null;
  play: (track: string) => void;
  pause: () => void;
  stop: () => void;
  volume: number;
  changeVolume: (newVolume: number) => void;
  progress: number;
  seek: (newProgress: number) => void;
  error: string | null;
  duration?: number;
  currentTime?: number;
}

export interface AudioProviderProps {
  children: React.ReactNode;
}

// Add this type declaration at the end of the file
declare global {
  interface Window {
    electronAPI?: {
      audioStateFromElectron: (callback: (state: "play" | "pause" | "stop") => void) => void;
      audioStateToElectron: (state: "play" | "pause" | "stop") => void;
    };
  }
}
