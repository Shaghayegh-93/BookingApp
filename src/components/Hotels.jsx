import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import useFetch from "./hooks/useFetch";
import { useHotels } from "./context/HotelProvider";

const Hotels = () => {
  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const destination = searchParams.get("destination");
  //   const room = JSON.parse(searchParams.get("option"))?.room;
  //   const { isLoading, data } = useFetch(
  //     "http://localhost:5000/hotels",
  //     `q=${destination || ""} &accommodates_gte=${room || 1}`
  //   );
  const { isLoading, data } = useHotels();

  if (isLoading) <Loader />;

  return (
    <div className="flex flex-col gap-4">
      <h2>Search Results ({data.length})</h2>
      {data.map((item) => {
        return (
          <Link
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            key={item.id}
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <img
                src={item.picture_url.url}
                alt={item.name}
                className="w-full md:w-24 h-24 object-cover rounded-2xl "
              />
              <div className="mb-8 last:mb-0">
                <p className="">{item.smart_location} </p>
                <p className="  font-medium text-tex400">{item.name}</p>
                <p className="font-medium flex items-center ">
                  {item.price}€ &nbsp;
                  <span className="text-tex400"> night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Hotels;
