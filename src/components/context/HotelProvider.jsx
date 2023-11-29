import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";
// const BASE_URL = "/server.js";

function HotelProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("option"))?.room;
  const { isLoading, data } = useFetch(
    BASE_URL,
    `q=${destination || ""} &accommodates_gte=${room || 1}`
  );
  console.log(data)

  async function getSingleHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        data,
        isLoadingCurrentHotel,
        currentHotel,
        getSingleHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProvider;

export function useHotels() {
  return useContext(HotelContext);
}
