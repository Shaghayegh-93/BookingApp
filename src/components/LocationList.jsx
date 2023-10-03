import React from "react";
import useFetch from "./hooks/useFetch";

const LocationList = () => {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (isLoading) <p>loading...</p>;
  return (
    <div className="max-w-7xl my-8 mx-auto">
      <h2 className="mb-4">Nearby Location</h2>
      <div className="grid  grid-cols-gridAuto gap-8">
        {data.map((item) => {
          return (
            <div>
              <img
                className="w-full h-80 object-cover object-center rounded-lg mb-2"
                src={item.picture_url.url}
                alt={item.name}
              />
              <div className="mb-8 last:mb-0">
                <p className="">{item.smart_location} </p>
                <p className="font-medium text-tex400">{item.name}</p>
                <p className="font-medium flex items-center ">
                  {item.price}€ &nbsp;<span className="text-tex400"> night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationList;
