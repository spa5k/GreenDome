import { parseAsString, useQueryState } from "nuqs";

export function useFilter() {
  return useQueryState("filter", parseAsString.withDefault("all").withOptions({ shallow: false }));
}

export function useOrder() {
  return useQueryState("order", parseAsString.withDefault("asc").withOptions({ shallow: false }));
}

export function useSort() {
  return useQueryState("sort", parseAsString.withDefault("number").withOptions({ shallow: false }));
}
