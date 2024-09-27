"use client";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export function useEdition() {
  return useQueryState(
    "edition",
    parseAsString.withDefault("ara-quranindopak").withOptions({ clearOnDefault: true, shallow: false }),
  );
}

export function useTranslations() {
  return useQueryState(
    "translations",
    parseAsArrayOf(parseAsString, ",").withOptions({ history: "push", shallow: false }),
  );
}
