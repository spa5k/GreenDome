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
import { useReciter } from "../hooks/useRecitationHooks";

export function SelectReciter() {
  const [reciter, setReciter] = useReciter();

  const parsedReciters = reciters.map((reciter) => ({
    label: reciter.name,
    value: reciter.slug,
    id: reciter.id,
  }));

  const handleReciterChange = (value: string) => {
    setReciter(value);
    const reciter = parsedReciters.find(r => r.value === value);
    if (!reciter) {
      return;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Select
          value={reciter}
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
