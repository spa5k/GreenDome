import { useGeolocation } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useFetchLocationDataByCoords } from "../hooks/locationHooks";
import { useLocationStore } from "../store/salahStore";

export const LocationFetcher = () => {
  const {
    latitude,
    longitude,
    setCoordinates,
    setState,
    calculatePrayerTimes,
  } = useLocationStore();

  const { latitude: geoLatitude, longitude: geoLongitude, loading: geoLoading, error: geoError } = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 30_000,
    timeout: 27_000,
  });

  const { data: locationData, refetch, isLoading, error: fetchError } = useFetchLocationDataByCoords(
    geoLatitude?.toString() || "",
    geoLongitude?.toString() || "",
  );

  useEffect(() => {
    if ((!latitude || !longitude) && (geoLatitude && geoLongitude && !geoError && !geoLoading)) {
      setCoordinates(geoLatitude.toString(), geoLongitude.toString());
      calculatePrayerTimes();
    }
  }, [geoLatitude, geoLongitude, geoError, geoLoading, latitude, longitude, setCoordinates, calculatePrayerTimes]);

  useEffect(() => {
    if (locationData) {
      setState({
        latitude: locationData.lat,
        longitude: locationData.lng,
        cityName: locationData.name,
        meta: locationData.meta,
      });
      calculatePrayerTimes();
    }
  }, [locationData, setState, calculatePrayerTimes]);

  return null;
};
