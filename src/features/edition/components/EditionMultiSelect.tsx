"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import MultiSelectFormField from "@/components/ui/multi-select";
import { useForm } from "react-hook-form";
import { Edition } from "../api/edition";
import { useTranslations } from "../hooks/useEditionHooks";

interface EditionMultiSelectFormProps {
  edition: Edition[];
  queryParam: string;
  placeholder: string;
  description: string;
  defaultSelected?: string[]; // Optional prop for default selections
  maxSelectable?: number; // Optional prop to limit the number of selectable items
}

export const EditionMultiSelectForm = (
  { edition, queryParam, placeholder, description, defaultSelected = [], maxSelectable = 3 }:
    EditionMultiSelectFormProps,
) => {
  const [selectedEditions, setSelectedEditions] = useTranslations();

  // Initialize form with default values from query parameters or props
  const form = useForm<{ quran: string[] }>({
    defaultValues: {
      quran: defaultSelected,
    },
  });

  const parsedEditions = edition.map((edition) => ({
    label: edition.name,
    value: edition.slug,
  }));

  const onSubmit = (data: { quran: string[] }) => {
    console.log(data);
  };

  function updateQueryParam(value: string[]) {
    setSelectedEditions(value);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="quran"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MultiSelectFormField
                  options={parsedEditions}
                  defaultValue={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    updateQueryParam(value);
                  }}
                  placeholder={placeholder}
                  variant="inverted"
                  animation={0}
                  maxSelectable={maxSelectable}
                />
              </FormControl>
              <FormDescription>
                {description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
