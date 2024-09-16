"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy, Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";
import { WindowVirtualizer } from "virtua";
import { type Ayah, type AyahQFC } from "../quran/api/ayah";
import { reciters } from "../recitation/data/reciters";
import { useRecitationStore } from "../recitation/store/recitationStore";
import { AyahText } from "./ayah-text";
import MushafText from "./mushaf-text";
import { TranslationText } from "./translation-text";

type CombinedAyahListProps = {
  ayahs: (Ayah | AyahQFC)[];
  quranEditionsFetched: { id: number; ayahs: (Ayah | AyahQFC)[] }[];
  translationEditionsFetched: { id: number; ayahs: { text: string }[] }[];
  fallbackAyahs: Ayah[];
  version?: "v1" | "v2";
};

const AyahList = ({
  ayahs,
  quranEditionsFetched,
  translationEditionsFetched,
  fallbackAyahs,
  version,
}: CombinedAyahListProps) => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { currentAyah, isPlaying, setIsPlaying, setAyah, currentReciter, currentSurah } = useRecitationStore();

  const isQFC = (ayah: Ayah | AyahQFC): ayah is AyahQFC => "page" in ayah;

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: `Ayah ${index + 1} copied`,
        description: fallbackAyahs[index].text,
      });
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset icon after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCopyEvent = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection) return;

    const selectedText = selection.toString().replace(/(\d+),/g, "").replace(/\s+/g, " ").trim();

    const fallbackTexts = ayahs
      .map((ayah, index) => {
        const ayahText = ayah.text.replace(/(\d+),/g, "").replace(/\s+/g, " ").trim();
        if (selectedText.includes(ayahText)) {
          return fallbackAyahs[index].text;
        }
        return null;
      })
      .filter(text => text !== null)
      .join("\n");

    try {
      await navigator.clipboard.writeText(fallbackTexts);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const togglePlayPause = (index: number) => {
    if (isPlaying && currentAyah === index + 1) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsPlaying(true);
    }
    setAyah(index + 1);
  };

  const reciter = reciters.find((reciter) => reciter.slug === currentReciter);

  return (
    <div className="flex flex-col gap-5 mb-96" ref={containerRef} onCopy={handleCopyEvent}>
      <Toaster />
      <WindowVirtualizer>
        {ayahs.map((ayah, index) => (
          <div key={index} className="flex flex-col gap-6 justify-center mt-4">
            <div className="flex gap-5">
              <Badge className="w-10 flex justify-center text-xl">{ayah.ayah}</Badge>
              <Button
                onClick={() => handleCopy(fallbackAyahs[index].text, index)}
                size="icon"
                aria-label={`Copy Ayah ${index + 1}`}
              >
                {copiedIndex === index ? <Check /> : <Copy />}
              </Button>
              <Button
                onClick={() => togglePlayPause(index)}
                size="icon"
                aria-label={`Play/Pause Ayah ${index + 1}`}
              >
                {isPlaying && currentAyah === index + 1 ? <Pause /> : <Play />}
              </Button>
            </div>
            <div key={quranEditionsFetched[0].id}>
              {isQFC(ayah)
                ? (
                  <MushafText
                    page={ayah.page.toString()}
                    text={ayah.text}
                    type={version}
                    fallbackText={fallbackAyahs[index].text}
                  />
                )
                : (
                  <AyahText
                    text={ayah.text}
                    editionId={quranEditionsFetched[0].id}
                    className="text-6xl"
                    number={ayah.ayah}
                    fallbackText={fallbackAyahs[index].text}
                  />
                )}
            </div>
            {translationEditionsFetched.map((edition) => (
              <div key={edition.id}>
                {edition.ayahs[index]?.text && (
                  <TranslationText text={edition.ayahs[index]!.text} editionId={edition.id} />
                )}
              </div>
            ))}
            <Separator />
          </div>
        ))}
      </WindowVirtualizer>
      {/* <AyahPlayer audioRef={audioRef} /> */}
    </div>
  );
};

export default AyahList;
