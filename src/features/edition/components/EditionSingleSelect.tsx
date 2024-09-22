"use client";

import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQueryState } from "nuqs";
import { Edition } from "../api/edition";

interface EditionSingleSelectFormProps {
  edition: Edition[];
  queryParam: string;
  placeholder: string;
  description: string;
  defaultSelected: string;
}

export const EditionSingleSelect = (
  { edition, placeholder, defaultSelected }: EditionSingleSelectFormProps,
) => {
  const [selectedEdition, setSelectedEdition] = useQueryState("q", {
    defaultValue: defaultSelected,
  });

  const parsedEditions = edition.map((edition) => ({
    label: edition.name,
    value: edition.slug,
  }));

  const handleChange = (value: string) => {
    setSelectedEdition(value);
  };

  return (
    <div className="space-y-8">
      <div>
        <Select
          value={selectedEdition!}
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
