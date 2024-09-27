"use client";

import { parseAsBoolean, parseAsFloat, parseAsString, useQueryState, useQueryStates } from "nuqs";

export function useAyah() {
  return useQueryState("ayah", parseAsString.withDefault("1"));
}

export function usePlaying() {
  return useQueryState("playing", parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }));
}

export function useReciter() {
  return useQueryState("reciter", parseAsString.withDefault("abdul_baset").withOptions({ clearOnDefault: true }));
}

export function useSurah() {
  return useQueryState("surah", parseAsString.withDefault("1").withOptions({ clearOnDefault: true }));
}

export function useAyahKey() {
  return useQueryStates(
    {
      ayah: parseAsString,
      surah: parseAsString,
    },
    {
      clearOnDefault: true,
    },
  );
}

export function useVolume() {
  return useQueryState("volume", parseAsFloat.withDefault(1).withOptions({ clearOnDefault: true }));
}

export function useMuted() {
  return useQueryState("muted", parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }));
}
