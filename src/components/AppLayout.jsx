import React from "react";
import { Outlet } from "react-router-dom";
import Map from "./Map";

const AppLayout = () => {
  return (
    <div className="mt-4 flex justify-between  items-stretch h-[calc(100vh-130px)] ">
      <div className="w-2/4 md:w-[35%] overflow-y-scroll pr-4">
        <Outlet />
      </div>
      <Map/>
    </div>
  );
};

export default AppLayout;
