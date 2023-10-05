import React from "react";
import { Outlet } from "react-router-dom";
import Map from "./Map";
import { useHotels } from "./context/HotelProvider";

const AppLayout = () => {
  const { data } = useHotels();
  return (
    <div className="mt-4 flex justify-between  items-stretch h-[calc(100vh-130px)] ">
      <div className="w-2/4 md:w-[35%] overflow-y-scroll pr-4">
        <Outlet />
      </div>
      <Map  markedLocation={data}/>
    </div>
  );
};

export default AppLayout;
