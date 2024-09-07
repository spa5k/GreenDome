"use client";

import { X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import type { Edition } from "../api/editions";

export function EditionsMultiSelect({ editions }: {
  editions: {
    id: number;
    name: string;
    author: string;
    language: string;
    direction: string;
    source: string;
    type: string;
    enabled: number;
  }[];
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selectedEditions, setSelectedEditions] = React.useState<Edition[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((edition: Edition) => {
    setSelectedEditions((prev) => prev.filter((s) => s.id !== edition.id));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelectedEditions((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [],
  );

  const selectables = editions.filter(
    // @ts-ignore
    (edition) => !selectedEditions.includes(edition),
  );

  const quranEditions = editions.filter(
    (edition) => edition.type === "QURAN",
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent z-100"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selectedEditions.map((edition) => {
            return (
              <Badge key={edition.id} variant="secondary">
                {edition.author}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(edition);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(edition)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandInput
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select editions..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList className="z-100">
          {open && quranEditions.length > 0
            ? (
              <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto">
                  {quranEditions.map((edition) => {
                    return (
                      <CommandItem
                        key={edition.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          setInputValue("");
                          // @ts-ignore
                          setSelectedEditions((prev) => [...prev, edition]);
                        }}
                        className={"cursor-pointer"}
                      >
                        {edition.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            )
            : null}
        </CommandList>
      </div>
    </Command>
  );
}
