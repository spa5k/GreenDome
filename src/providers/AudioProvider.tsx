"use client";

import { reciters } from "@/features/recitation/data/reciters";
import { useAyah, usePlaying, useReciter, useSurah, useVolume } from "@/features/recitation/hooks/useRecitationHooks";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
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
  duration: number | undefined;
  currentTime: number | undefined;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = usePlaying();
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [volume, setVolume] = useVolume();
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [ayah] = useAyah();
  const [surah] = useSurah();
  const [reciter] = useReciter();
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState<number | undefined>(undefined);

  const updatePositionState = useCallback(() => {
    if ("mediaSession" in navigator && audioRef.current) {
      navigator.mediaSession.setPositionState({
        duration: audioRef.current.duration || 0,
        playbackRate: audioRef.current.playbackRate,
        position: audioRef.current.currentTime || 0,
      });
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime / (audioRef.current.duration || 1));
      setCurrentTime(audioRef.current.currentTime);
      updatePositionState();
    }
  }, [updatePositionState]);

  const handleError = useCallback((e: ErrorEvent) => {
    setError(`Error playing audio: ${e.message}`);
    setIsPlaying(false);
    window.electron.setPause();
  }, [setIsPlaying]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const play = useCallback((track: string) => {
    if (!audioRef.current) return;

    if (currentTrack !== track) {
      audioRef.current.src = track;
      setCurrentTrack(track);
    }

    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setError(null);
        updatePlaybackState("playing");
        window.electron.setPlay();
      })
      .catch((err: Error) => {
        setError(`Error playing audio: ${err.message}`);
        setIsPlaying(false);
        window.electron.setPause();
      });
  }, [currentTrack, setIsPlaying]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
    updatePlaybackState("paused");
    window.electron.setPause();
  }, [setIsPlaying]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    updatePlaybackState("none");
    window.electron.setPause();
  }, [setIsPlaying]);

  const changeVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  }, [setVolume]);

  const seek = useCallback((newProgress: number) => {
    if (audioRef.current?.duration) {
      audioRef.current.currentTime = newProgress * audioRef.current.duration;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    audioRef.current = new Audio();
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("error", handleError);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("play", updatePositionState);
    audioRef.current.addEventListener("pause", updatePositionState);
    audioRef.current.addEventListener("seeked", updatePositionState);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("error", handleError);
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audioRef.current.removeEventListener("play", updatePositionState);
        audioRef.current.removeEventListener("pause", updatePositionState);
        audioRef.current.removeEventListener("seeked", updatePositionState);
      }
    };
  }, [handleTimeUpdate, handleError, handleLoadedMetadata, updatePositionState]);

  const setupMediaSession = useCallback(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", () => currentTrack && play(currentTrack));
      navigator.mediaSession.setActionHandler("pause", pause);
      navigator.mediaSession.setActionHandler("stop", stop);
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details.seekTime && audioRef.current) {
          audioRef.current.currentTime = details.seekTime;
          updatePositionState();
        }
      });
      navigator.mediaSession.setActionHandler("seekbackward", (details) => {
        if (audioRef.current) {
          audioRef.current.currentTime -= details.seekOffset || 10;
          updatePositionState();
        }
      });
      navigator.mediaSession.setActionHandler("seekforward", (details) => {
        if (audioRef.current) {
          audioRef.current.currentTime += details.seekOffset || 10;
          updatePositionState();
        }
      });
    }
  }, [currentTrack, play, pause, stop, updatePositionState]);

  useEffect(() => {
    setupMediaSession();
  }, [setupMediaSession]);

  const reciterName = reciters.find((r) => r.slug === reciter)?.name;

  useEffect(() => {
    updateMediaSessionMetadata();
  }, [ayah, surah, reciter, reciterName]);

  const updateMediaSessionMetadata = () => {
    if ("mediaSession" in navigator) {
      const image = `/surah/${surah}.webp`;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `Surah ${surah} - Ayah ${ayah}`,
        artist: reciterName,
        album: `Surah ${surah}`,
        artwork: [{ src: image, sizes: "512x512", type: "image/webp" }],
      });

      // add duration
      navigator.mediaSession.setPositionState({
        duration: duration || 0,
        playbackRate: 1,
        position: currentTime || 0,
      });
    }
  };

  const updatePlaybackState = (state: MediaSessionPlaybackState) => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = state;
    }
  };

  useEffect(() => {
    window.electron.onPlay(() => {
      if (currentTrack) {
        play(currentTrack);
        setIsPlaying(true);
        updatePlaybackState("playing");
      }
    });
    window.electron.onPause(() => {
      pause();
      setIsPlaying(false);
      updatePlaybackState("paused");
    });
  }, [currentTrack, play, pause, setIsPlaying]);

  const contextValue: AudioContextType = {
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
  };

  return (
    <AudioContext.Provider value={contextValue}>
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
