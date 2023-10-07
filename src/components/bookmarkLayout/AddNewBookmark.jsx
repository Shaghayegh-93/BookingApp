import React, { useEffect, useState } from "react";
import useUrlLocation from "../hooks/useUrlLocation";
import axios from "axios";
import Loader from "../Loader";
import ReactCountryFlag from "react-country-flag";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

const AddNewBookmark = () => {
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadinGeoCoding] = useState(false);
  const [geoCodinError, setGeoCodingError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchLocationData() {
      setIsLoadinGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "This location is not a city!please click somewhere else"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadinGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodinError) return <strong>{geoCodinError}</strong>;
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form>
        <div className="mb-4 relative">
          <label className="block mb-1" htmlFor="cityName">
            CityName
          </label>
          <ReactCountryFlag
            className="absolute right-4 top-10"
            svg
            countryCode={countryCode}
          />
          <input
            className="border border-tex400  p-2 rounded-lg w-full"
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-1" htmlFor="country">
            Country
          </label>
          <input
            className="border border-tex400  p-2 rounded-lg w-full"
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between mt-8">
          <button className="py-2 px-4 rounded-lg border border-tex400">
            &larr; Back
          </button>
          <button className="py-2 px-4 rounded-lg border bg-primar600 text-white">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookmark;
