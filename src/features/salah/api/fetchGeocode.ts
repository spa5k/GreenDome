import type { LocationResponse } from "../types";

async function fetchGeocode(location: string): Promise<LocationResponse> {
  const url = `https://quran-location.remtl.workers.dev/api/location/${
    encodeURIComponent(
      location,
    )
  }`;
  const headers = {
    "X-Custom-Header": "your-random-value",
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      "An error occurred while fetching geocode information:",
      error,
    );
    throw error;
  }
}
