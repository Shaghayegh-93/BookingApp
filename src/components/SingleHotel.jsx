import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { useHotels } from "./context/HotelProvider";

const SingleHotel = () => {
  const { id } = useParams();
  const { isLoadingCurrentHotel, currentHotel, getSingleHotel } = useHotels();
  useEffect(() => {
    getSingleHotel(id);
  }, [id]);
  if (isLoadingCurrentHotel || !currentHotel) return <Loader />;
  return (
    <div className="flex items-stretch justify-between gap-4  max-w-7xl my-0 md:my-8 mx-0">
      <div>
        <h2 className="mb-1 text-base ">{currentHotel.name}</h2>
        <div className="mb-1 text-tex500">
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img
          className="w-full h-auto object-cover rounded-xl"
          src={currentHotel.xl_picture_url}
          alt={currentHotel.name}
        />
      </div>
    </div>
  );
};

export default SingleHotel;
