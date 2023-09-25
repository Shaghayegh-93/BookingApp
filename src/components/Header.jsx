import React, { useState } from "react";
import {
  CalendarIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [option, setOption] = useState({ adult: 1, children: 1, room: 1 });
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="w-full max-w-[900px] flex  flex-col md:flex-row items-center justify-between gap-4 md:border border-[#ebe9e9] rounded-3xl p-4">
        <div className="flex items-center relative border md:border-none border-[#ebe9e9] rounded-3xl w-full md:w-fit">
          <MapPinIcon className="text-rose500 w-6 h-6 inline-block " />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where to go"
            className="text-base py-3 px-2"
          />
          <span className="hidden md:inline-block h-[30px] w-[1px] bg-tex400 my-0 mx-4"></span>
        </div>
        <div className="flex items-center relative border md:border-none border-[#ebe9e9] rounded-3xl p-4 w-full md:w-fit">
          <CalendarIcon className=" w-6 h-6 inline-block text-primar700 " />
          <div className="mr-2 text-sm">2023</div>
          <span className="hidden md:inline-block h-[30px] w-[1px] bg-tex400 my-0 mx-4"></span>
        </div>
        <div className="flex items-center relative border md:border-none border-[#ebe9e9] rounded-3xl p-4 w-full md:w-fit ">
          <div onClick={() => setIsOpenOptions(!isOpenOptions)}>gjhjkhk</div>
          {isOpenOptions && <GusetOptionList option={option} />}
          {/* <span className="hidden md:inline-block h-[30px] w-[1px] bg-tex400 my-0 mx-4"></span> */}
        </div>
        <div className=" items-center relative hidden md:flex ">
          <button className="flex items-center justify-center bg-primar600 text-white rounded-2xl p-2 ">
            <MagnifyingGlassIcon className=" w-6 h-6 inline-block" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

function GusetOptionList({ option }) {
  return (
    <div className="absolute bg-white p-4 border border-tex100 rounded-2xl top-11 md:top-10 right-0 md:-right-[55px] w-full md:w-[220px] z-10 shadow-[0,0,10px,#efefef]">
      <GusetOptionItem option={option} />
      <GusetOptionItem option={option} />
      <GusetOptionItem option={option} />
    </div>
  );
}

function GusetOptionItem({ option }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4 last:mb-0">
      <span className="inline-block flex-1 text-sm">adult</span>
      <div className="flex items-center gap-4">
        <button className="inline-block p-2 rounded-lg text-tex500 bg-tex100">
          <MinusIcon className="w-4 h-4 inline-block" />
        </button>
        <span className="inline-block">2</span>
        <button className="inline-block p-2 rounded-lg text-tex500 bg-tex100">
          <PlusIcon className="w-4 h-4 inline-block" />
        </button>
      </div>
    </div>
  );
}
