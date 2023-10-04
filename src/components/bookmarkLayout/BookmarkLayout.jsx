import React from "react";
import Map from "../Map";
import { useBookmarkList } from "../context/BookmarkListProvider";
import { Outlet } from "react-router-dom";

const BookmarkLayout = () => {
  const { data } = useBookmarkList();
  return (
    <div className="mt-4 flex justify-between  items-stretch h-[calc(100vh-130px)] ">
      <div className="w-2/4 md:w-[35%] overflow-y-scroll pr-4">
        <Outlet />
      </div>
      <Map markedLocation={data} />
    </div>
  );
};

export default BookmarkLayout;
