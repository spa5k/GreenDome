import { CalculationMethod, Coordinates, Prayer, PrayerTimes } from 'adhan';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { usePosition } from 'use-position';
import { create } from 'zustand';
import Icones from "icones-js";


function prayerName(prayer: Prayer) {
  switch (prayer) {
    case Prayer.Fajr:
      return 'Fajr';
    case Prayer.Dhuhr:
      return 'Dhuhr';
    case Prayer.Asr:
      return 'Asr';
    case Prayer.Maghrib:
      return 'Maghrib';
    case Prayer.Isha:
      return 'Isha';
    case Prayer.None:
      return 'None';
    default:
      return '';
  }
}

//capitalize first letter of prayer name 
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//get prayer times
function getPrayerTimes(latitude: number, longitude: number) {
  const coordinates = new Coordinates(latitude, longitude);
  const params = CalculationMethod.Karachi();
  // params.madhab = adhan.Madhab.Hanafi;
  const date = new Date();
  return new PrayerTimes(coordinates, date, params);
}

//zustand store
const usePrayerTimes = create((set) => ({
  prayerTimes: null,
  setPrayerTimes: (latitude: number, longitude: number) => {
    const prayerTimes = getPrayerTimes(latitude, longitude);
    set({ prayerTimes });
  },
}));


// PrayerTimesComponent
export default function PrayerTimesComponent() {
  const { latitude, longitude, error } = usePosition();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>();
  const [location, setLocation] = useState('');


  useEffect(() => {
    if (latitude != null && longitude != null) {
      setPrayerTimes(getPrayerTimes(latitude, longitude));
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(res => res.json())
        .then(data => {
          setLocation(`${data.locality}, ${data.principalSubdivision}, ${data.countryName} `);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [latitude, longitude]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Prayer Times in {location}</h1>
      {error ? (
        <div className="flex flex-col items-center">
          <p className="text-red-500 mb-4">
            Sorry, an error occurred: {error.message}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      ) : prayerTimes ? (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(prayerTimes)
              .filter((prayer) => prayer !== "date" && prayer !== "coordinates" && prayer !== "calculationParameters" && prayer !== "sunset" && prayer !== "sunrise")
              .map((prayer) => {
                return (
                  <div className="bg-white shadow-md rounded-lg px-4 py-6 flex flex-col items-center justify-center" key={prayer}>
                    <p className="text-lg font-bold mb-4">{capitalizeFirstLetter(prayer)}</p>
                    <p className="text-3xl font-bold text-center">{
                      moment(prayerTimes[prayer]).tz(moment.tz.guess()).format("h:mm A")
                    }</p>
                  </div>
                );
              })}
          </div>
          {/* current prayer time but if its sunrise then show dhur */}
          <p className="text-lg mt-6">
            Current Prayer:{" "}
            {capitalizeFirstLetter(
              prayerTimes.currentPrayer() === Prayer.Sunrise
                ? "Dhuhr"
                : prayerName(prayerTimes.currentPrayer())
            )}
          </p>
        </div>
      ) : (
        <p className="text-lg font-bold">Getting your location...</p>
      )}
    </div>
  );
  
  
}  