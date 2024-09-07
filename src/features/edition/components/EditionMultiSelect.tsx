"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import MultiSelectFormField from "@/components/ui/multi-select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Edition } from "../api/editions";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  // check if the data is there in defaultSelected and name is not null

  // Initialize form with default values from query parameters or props
  const form = useForm<{ quran: string[] }>({
    defaultValues: {
      quran: defaultSelected,
    },
  });

  const parsedEditions = edition.map((edition) => ({
    label: edition.name,
    value: edition.id.toString(),
  }));

  const updateQueryParam = (selectedEditions: string[]) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (selectedEditions.length > 0) {
      const enabledEditions = selectedEditions.join(",");
      currentParams.set(queryParam, enabledEditions);
    } else {
      currentParams.delete(queryParam); // Remove the query parameter if the selection is empty
    }
    const newQueryString = currentParams.toString().replace(/%2C/g, ","); // Replace encoded commas with actual commas
    router.push(`?${newQueryString}`);
  };

  useEffect(() => {
    const qParam = searchParams.get(queryParam);
    const initialSelections = qParam ? qParam.split(",") : defaultSelected;
    form.setValue("quran", initialSelections);
  }, [searchParams, form, queryParam, defaultSelected]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateQueryParam(value.quran as string[]);
    });
    return () => subscription.unsubscribe();
  }, [form, queryParam]);

  const onSubmit = (data: { quran: string[] }) => {
    console.log(data);
  };

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
