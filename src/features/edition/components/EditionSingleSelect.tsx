"use client";

import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Edition } from "../api/edition";

interface EditionSingleSelectFormProps {
  edition: Edition[];
  queryParam: string;
  placeholder: string;
  description: string;
  defaultSelected?: string; // Optional prop for default selection
}

export const EditionSingleSelect = (
  { edition, queryParam, placeholder, description, defaultSelected = "" }: EditionSingleSelectFormProps,
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedEdition, setSelectedEdition] = useState<string>(defaultSelected);

  const parsedEditions = edition.map((edition) => ({
    label: edition.name,
    value: edition.id.toString(),
  }));

  const updateQueryParam = (selectedEdition: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (selectedEdition) {
      currentParams.set(queryParam, selectedEdition);
    } else {
      currentParams.delete(queryParam); // Remove the query parameter if the selection is empty
    }
    const newQueryString = currentParams.toString().replace(/%2C/g, ","); // Replace encoded commas with actual commas
    router.push(`?${newQueryString}`);
  };

  useEffect(() => {
    const qParam = searchParams.get(queryParam);
    const initialSelection = qParam || defaultSelected;
    setSelectedEdition(initialSelection);
  }, [searchParams, queryParam, defaultSelected]);

  const handleChange = (value: string) => {
    setSelectedEdition(value);
    updateQueryParam(value);
  };

  return (
    <div className="space-y-8">
      <div>
        <Select
          value={selectedEdition}
          onValueChange={handleChange}
        >
          <SelectTrigger className="w-full md:w-[310px]">
            <Badge
              className="text-xs"
              color="primary"
            >
              <SelectValue placeholder={placeholder} className="" />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {parsedEditions.map((edition) => {
                return (
                  <SelectItem key={edition.value} value={edition.value}>
                    {edition.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center justify-between w-full mx-auto">
          <label className="text-sm text-muted-foreground mt-1.5">
            {placeholder}
          </label>
        </div>
      </div>
    </div>
  );
};
