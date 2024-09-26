import { createSearchParamsCache, parseAsArrayOf, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  // List your search param keys and associated parsers here:
  q: parseAsString.withDefault("ara-quranindopak"),
  t: parseAsArrayOf(parseAsString, ",").withDefault(["eng-ummmuhammad"]),
  tl: parseAsString.withDefault(""),
  start: parseAsString.withDefault(""),
  end: parseAsString.withDefault(""),
});
