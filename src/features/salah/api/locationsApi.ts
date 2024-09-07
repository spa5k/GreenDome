import type { Location } from "../types";

export const fetchLocationData = async (
  locationInput: string,
): Promise<Location> => {
  if (!locationInput) {
    throw new Error("Location input is required");
  }

  try {
    const locationResponse = await fetch(
      `https://quran-location.remtl.workers.dev/api/location/${locationInput}`,
      {
        headers: {
          "X-Custom-Header": "your-random-value",
        },
      },
    );

    const locationData = await locationResponse.json();
    if (!locationData.success) {
      throw new Error("Failed to fetch locations");
    }
    const location = locationData.result[0];
    let cityName = location.name;
    const country = location.country;
    try {
      // Fetch city name
      const cityNameResponse = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.lat}&longitude=${location.lng}&localityLanguage=en`,
      );
      const cityNameData = await cityNameResponse.json();
      if (cityNameData.city) {
        cityName = cityNameData.city;
      }
    } catch (err) {
      console.error("Error fetching city name:", err);
    }

    // Fetch metadata
    const metaResponse = await fetch(
      `https://api.aladhan.com/v1/calendar/2024/6?latitude=${location.lat}&longitude=${location.lng}`,
    );
    const metaData = await metaResponse.json();
    if (metaData.code !== 200) {
      throw new Error("Failed to fetch metadata");
    }
    const meta = metaData.data[0].meta;

    return {
      country,
      lat: location.lat,
      lng: location.lng,
      name: location.name,
      city: cityName,
      meta,
    };
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};

// now create another function that does the above, but takes latitude and longitude as arguments,
export const fetchLocationDataByCoords = async (
  latitude: string,
  longitude: string,
): Promise<Location> => {
  try {
    // Fetch city name
    const locationResponse = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    );
    const cityNameData = await locationResponse.json();
    if (!cityNameData.city) {
      throw new Error("City name not found");
    }
    const cityName: string = cityNameData.city;
    const country: string = cityNameData.countryName;

    // Fetch metadata
    const metaResponse = await fetch(
      `https://api.aladhan.com/v1/calendar/2024/6?latitude=${latitude}&longitude=${longitude}`,
    );
    const metaData = await metaResponse.json();
    if (metaData.code !== 200) {
      throw new Error("Failed to fetch metadata");
    }
    const meta = metaData.data[0].meta;

    return {
      country,
      lat: latitude,
      lng: longitude,
      name: cityName,
      city: cityName,
      meta,
    };
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};
