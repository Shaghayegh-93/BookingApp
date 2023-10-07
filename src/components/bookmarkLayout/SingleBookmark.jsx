import React, { useEffect } from "react";
import { useBookmarkList } from "../context/BookmarkListProvider";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

const SingleBookmark = () => {
  const { getBookmark, currentBookmarkList, isLoadingCurrentBookmarkList } =
    useBookmarkList();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoadingCurrentBookmarkList || !currentBookmarkList) return <Loader />;
  return (
    <div>
      <button
        className="py-2 px-4 rounded-lg border border-solid border-tex400 mb-4 "
        onClick={() => navigate(-1)}
      >
        &larr;Back
      </button>
      <h2 className="font-bold mb-4 text-xl text-primar600">{currentBookmarkList.cityName}</h2>
      <div
        className={
          "mb-4 border border-solid border-tex400 rounded-2xl p-4 flex items-center justify-between "
        }
      >
        <ReactCountryFlag countryCode={currentBookmarkList.countryCode} svg />{" "}
        &nbsp;
        <strong> {currentBookmarkList.cityName}</strong> &nbsp;
        <span>{currentBookmarkList.country}</span>
      </div>
    </div>
  );
};

export default SingleBookmark;
