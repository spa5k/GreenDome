import { createSearchParamsCache, parseAsString } from "nuqs/server";
// Note: import from 'nuqs/server' to avoid the "use client" directive

export const datafiltersCache = createSearchParamsCache({
  filter: parseAsString.withDefault("all"),
  order: parseAsString.withDefault("asc"),
  sort: parseAsString.withDefault("asc"),
});
