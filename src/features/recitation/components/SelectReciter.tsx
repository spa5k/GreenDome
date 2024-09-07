"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reciters } from "@/features/recitation/data/reciters";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useRecitationStore } from "../store/recitationStore";

export function SelectReciter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    setReciter,
    setAyah,
    setSelectedReciter,
    setCurrentAyah,
    selectedReciter,
  } = useRecitationStore();

  const parsedReciters = reciters.map((reciter) => ({
    label: reciter.name,
    value: reciter.slug,
    id: reciter.id,
  }));

  const updateQueryParams = useCallback((params: Record<string, string>) => {
    const currentParams = new URLSearchParams(window.location.search);
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        currentParams.set(key, params[key]);
      } else {
        currentParams.delete(key);
      }
    });
    const newQueryString = currentParams.toString().replace(/%2C/g, ",");
    router.push(`?${newQueryString}`);
  }, [router]);

  useEffect(() => {
    const reciterParam = searchParams.get("reciter");
    const initialReciter = reciterParam || selectedReciter;
    const initialAyah = "1";
    setSelectedReciter(initialReciter);
    setCurrentAyah(initialAyah);
    setReciter(initialReciter);
    setAyah(parseInt(initialAyah, 10));
  }, [searchParams, setReciter, setAyah, setSelectedReciter, setCurrentAyah, selectedReciter]);

  const handleReciterChange = (value: string) => {
    setSelectedReciter(value);
    setReciter(value);
    const reciter = parsedReciters.find(r => r.value === value);
    if (!reciter) {
      return;
    }
    updateQueryParams({ reciter: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <Select
          value={selectedReciter}
          onValueChange={handleReciterChange}
        >
          <Label className="mb-10">Select Reciter</Label>
          <SelectTrigger className="w-full md:w-[310px]">
            <SelectValue placeholder="Select a reciter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Reciter</SelectLabel>
              {parsedReciters.map((reciter) => (
                <SelectItem key={reciter.id} value={reciter.value.toString()}>
                  {reciter.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
