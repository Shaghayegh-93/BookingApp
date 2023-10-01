import { useState } from "react";

export default function useGeoLocation() {
  const [isLoadingGeoPosition, setIsLoadingGeoPosition] = useState(false);
  const [error, setError] = useState(null);
  const [geoLocationPosition, setGeoLocationPosition] = useState({});

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoadingGeoPosition(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLocationPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoadingGeoPosition(false);
      },
      (error) => {
        setError(error.message);
        setIsLoadingGeoPosition(false);
      }
    );
  }
  return { isLoadingGeoPosition, error, geoLocationPosition, getPosition };
}
