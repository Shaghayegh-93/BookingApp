import React from "react";
import { LoaderIcon } from "react-hot-toast";

const Loader = () => {
  return (
    <div className="text-primar600 flex items-center gap-4 my-4 mx-auto">
      <p>Loading data</p>
      <LoaderIcon className="w-6 H-6" />
    </div>
  );
};

export default Loader;
