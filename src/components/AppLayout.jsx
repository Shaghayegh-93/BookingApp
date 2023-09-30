import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="mt-4 flex justify-between  items-stretch h-[calc(100vh-130px)] ">
      <div className="w-2/4 md:w-[35%] overflow-y-scroll pr-4">
        
        <Outlet />
      </div>
      <div className="flex-1 bg-tex100 relative">map</div>
    </div>
  );
};

export default AppLayout;
