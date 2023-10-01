import React, { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const HotelContext = createContext();

function HotelProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("option"))?.room;
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""} &accommodates_gte=${room || 1}`
  );

  return (
    <HotelContext.Provider value={{ isLoading, data }}>
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProvider;

export function useHotels() {
  return useContext(HotelContext);
}

