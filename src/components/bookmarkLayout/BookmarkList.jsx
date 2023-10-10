import React from "react";
import { useBookmarkList } from "../context/BookmarkListProvider";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { TrashIcon } from "@heroicons/react/24/solid";

const BookmarkList = () => {
  const { bookmarks, isLoading, currentBookmarkList, deleteBookmark } =
    useBookmarkList();

  const removeHandler = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };
  if (isLoading) return <Loader />;
  if(!bookmarks.length) return <p>There is no bookmarked location.</p>
  return (
    <div>
      <h2>BookmarkList</h2>
      <div className="mt-4">
        {bookmarks.map((item) => {
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
                <div className="flex flex-col items-center md:block ">
                  <ReactCountryFlag countryCode={item.countryCode} svg /> &nbsp;
                  <strong> {item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => removeHandler(e, item.id)}>
                  <TrashIcon className="text-rose-500 w-4 h-4 mt-4 md:mt-0" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BookmarkList;
