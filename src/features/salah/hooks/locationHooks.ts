import type { Location } from "../types";

import { type QueryKey, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { fetchLocationData, fetchLocationDataByCoords } from "../api/locationsApi";

export const useFetchLocationData = (locationInput: string) => {
  const options: UseQueryOptions<Location, Error, Location, QueryKey> = {
    queryKey: ["location", locationInput],
    queryFn: () => fetchLocationData(locationInput),
    enabled: locationInput.length > 0,
  };

  return useQuery<Location, Error, Location, QueryKey>(options);
};

export const useFetchLocationDataByCoords = (
  latitude: string,
  longitude: string,
) => {
  const options: UseQueryOptions<Location, Error, Location, QueryKey> = {
    queryKey: ["location", latitude, longitude],
    queryFn: () => fetchLocationDataByCoords(latitude, longitude),
    enabled: latitude.length > 0 && longitude.length > 0,
  };

  return useQuery<Location, Error, Location, QueryKey>(options);
};
