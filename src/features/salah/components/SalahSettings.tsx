import { Spinner } from "@/components/icons/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGeolocation } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Copy, Pause, PencilIcon, Play, Search, SettingsIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFetchLocationData } from "../hooks/locationHooks";
import { useLocationStore } from "../store/salahStore";

dayjs.extend(utc);
dayjs.extend(timezone);

export const SalahSettingsDialog = () => {
  const {
    latitude,
    longitude,
    meta,
    prayerTimes,
    madhab,
    setMadhab,
    calculatePrayerTimes,
    setCoordinates,
    playAdhan,
    toggleAdhan,
    cityName,
    setState,
  } = useLocationStore();

  const [locationInput, setLocationInput] = useState<string>("");
  const [finalLocation, setFinalLocation] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempLatitude, setTempLatitude] = useState(latitude);
  const [tempLongitude, setTempLongitude] = useState(longitude);
  const [isPlaying, setIsPlaying] = useState(false);
  const adhanAudioRef = useRef<HTMLAudioElement>(null);
  const { data: locationData, refetch, isLoading, error: fetchError } = useFetchLocationData(finalLocation);
  const { latitude: geoLatitude, longitude: geoLongitude, loading: geoLoading, error: geoError } = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 30_000,
    timeout: 27_000,
  });

  useEffect(() => {
    setTempLatitude(latitude);
    setTempLongitude(longitude);
  }, [latitude, longitude]);

  useEffect(() => {
    if (locationData) {
      setTempLatitude(locationData.lat);
      setTempLongitude(locationData.lng);
    }
  }, [locationData]);

  const handleUpdatePrayerTimes = () => {
    setIsEditing(false);
    setCoordinates(tempLatitude, tempLongitude);
    calculatePrayerTimes();
  };

  const showNotification = (prayerName?: string) => {
    if (Notification.permission === "granted") {
      new Notification("Prayer Time", {
        body: `It's time for ${prayerName ?? ""} prayer.`,
        icon: "/aqsa.jpg",
        badge: "/aqsa.jpg",
      });
    }
  };

  const handlePlayPauseAdhan = () => {
    if (adhanAudioRef.current) {
      if (isPlaying) {
        adhanAudioRef.current.pause();
        adhanAudioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        adhanAudioRef.current.play();
        if (prayerTimes?.currentPrayer) {
          showNotification(prayerTimes.currentPrayer());
        } else {
          console.error("Prayer times are not available");
          showNotification();
        }
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (!(locationData && finalLocation)) {
      return;
    }
    setFinalLocation("");
    setState({
      latitude: locationData.lat,
      longitude: locationData.lng,
      cityName: locationData.name,
      meta: locationData.meta,
    });
    calculatePrayerTimes();
  }, [finalLocation, locationData]);

  const updateLocationUsingGeolocation = () => {
    if (geoLatitude && geoLongitude && !geoError && !geoLoading) {
      setCoordinates(geoLatitude.toString(), geoLongitude.toString());
      calculatePrayerTimes();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          {cityName ? "Edit Location" : "Add Location"}
          <SettingsIcon className="h-6 w-6 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full">
        <DialogDescription className="sr-only">
          Prayer Time Settings
        </DialogDescription>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Prayer Time Settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="settings" className="w-[450px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="meta">Meta</TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <div className="grid gap-4 p-4 w-full">
              <div className="space-y-2 mb-3">
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center justify-between">
                  <Input
                    id="location"
                    placeholder="Search for your city"
                    value={locationInput ? locationInput : cityName}
                    onChange={(e) => setLocationInput(e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <Button onClick={() => setFinalLocation(locationInput)} size="icon" disabled={isLoading}>
                    {isLoading
                      ? <Spinner className="h-5 w-5" />
                      : <Search className="h-5 w-5" />}
                  </Button>
                </div>
                {fetchError && (
                  <p className="text-red-500">
                    Failed to fetch location data. Please try again {JSON.stringify(fetchError)}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="playAdhan">Play Adhan</Label>
                <div className="flex justify-between items-center">
                  <Switch
                    id="playAdhan"
                    checked={playAdhan}
                    onCheckedChange={toggleAdhan}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="adhan">Adhan</Label>
                <Button onClick={handlePlayPauseAdhan} size="icon">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
              </div>

              <div className="space-y-2 mb-3">
                <Label htmlFor="madhab">Madhab</Label>
                <Select
                  defaultValue={madhab}
                  onValueChange={(value) => {
                    if (value === "shafi" || value === "hanafi") {
                      setMadhab(value);
                      calculatePrayerTimes();
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Madhab" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hanafi">Hanafi</SelectItem>
                    <SelectItem value="shafi">Shafi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 mb-3">
                <Label htmlFor="latitude">Latitude</Label>
                <div className="flex items-center">
                  <Input
                    id="latitude"
                    type="number"
                    placeholder="Enter latitude"
                    value={isEditing ? tempLatitude : latitude}
                    onChange={(e) => setTempLatitude(e.target.value)}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                    className="flex-grow mr-2"
                  />
                  <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                    <PencilIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <Label htmlFor="longitude">Longitude</Label>
                <div className="flex items-center">
                  <Input
                    id="longitude"
                    type="number"
                    placeholder="Enter longitude"
                    value={isEditing ? tempLongitude : longitude}
                    onChange={(e) => setTempLongitude(e.target.value)}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                    className="flex-grow mr-2"
                  />
                  <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                    <PencilIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                </div>
              </div>

              {isEditing && <Button onClick={handleUpdatePrayerTimes}>Update Prayer Times</Button>}
              <Button onClick={updateLocationUsingGeolocation} disabled={geoError?.PERMISSION_DENIED ? true : false}>
                {geoError ? "Location Denied" : "Use My Location"}
              </Button>
              <DialogFooter className="text-muted-foreground text-sm">
                Changes are automatically saved
              </DialogFooter>
            </div>
          </TabsContent>
          <TabsContent value="meta">
            {meta && (
              <Card className="h-[600px] overflow-scroll">
                <CardHeader className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Metadata
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(meta, null, 2));
                    }}
                    size="icon"
                  >
                    <Copy />
                  </Button>
                </CardHeader>
                <CardContent className="overflow-auto ">
                  <pre className="text-gray-800 dark:text-gray-200">
                  {JSON.stringify(meta, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
      <audio ref={adhanAudioRef} src="/azan1.mp3" />
    </Dialog>
  );
};
