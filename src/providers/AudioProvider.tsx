"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    audioRef.current = new Audio();

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

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("error", handleError);
      }
    };
  }, []);

  const play = (track: string) => {
    if (audioRef.current) {
      if (currentTrack !== track) {
        audioRef.current.src = track;
        setCurrentTrack(track);
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setError(null); // Reset error state when a new track is played
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
    }
  };

  const stop = () => {
    if (!audioRef.current) {
      return;
    }
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
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
