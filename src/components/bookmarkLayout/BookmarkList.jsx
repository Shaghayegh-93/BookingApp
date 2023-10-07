import React from "react";
import { useBookmarkList } from "../context/BookmarkListProvider";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

const BookmarkList = () => {
  const { data, isLoading, currentBookmarkList } = useBookmarkList();
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>BookmarkList</h2>
      <div className="mt-4">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`mb-4 border border-solid border-tex400 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between ${
                  item.id === currentBookmarkList?.id
                    ? "border border-primar600 bg-tex100"
                    : ""
                }`}
              >
                <ReactCountryFlag countryCode={item.countryCode} svg /> &nbsp;
                <strong> {item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BookmarkList;
