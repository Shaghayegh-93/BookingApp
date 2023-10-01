import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import Loader from "./Loader";

const SingleHotel = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetch(`http://localhost:5000/hotels/${id}`);
  if (isLoading) return <Loader />;
  return (
    <div className="flex items-stretch justify-between gap-4  max-w-7xl my-0 md:my-8 mx-0">
      <div>
        <h2 className="mb-1 text-base ">{data.name}</h2>
        <div className="mb-1 text-tex500">
          {data.number_of_reviews} reviews &bull; {data.smart_location}
        </div>
        <img
          className="w-full h-auto object-cover rounded-xl"
          src={data.xl_picture_url}
          alt={data.name}
        />
      </div>
    </div>
  );
};

export default SingleHotel;
