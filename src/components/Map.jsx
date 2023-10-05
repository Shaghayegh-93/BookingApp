import React, { useEffect, useState } from "react";
import { useHotels } from "./context/HotelProvider";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "./hooks/useGeoLocation";

const Map = ({ markedLocation }) => {
  const [mapCenter, setMapCenter] = useState([50, 1]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { isLoadingGeoPosition, geoLocationPosition, error, getPosition } =
    useGeoLocation();

  //   console.log("isLodingGeoPosition:", isLoadingGeoPosition);

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng)
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className="flex-1 bg-tex100 relative">
      <MapContainer
        className="h-full"
        center={[lat || 51, lng || 3]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button
          onClick={getPosition}
          className="py-1 px-2 text-xs font-bold rounded-lg absolute bottom-2 left-2 bg-primar600 text-white  z-[1000] shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        >
          {isLoadingGeoPosition ? "Loading" : " Use Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        <DetectClick />
        {markedLocation.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat} &lng=${e.latlng.lng} `
      ),
    
  });
  return null;
}
