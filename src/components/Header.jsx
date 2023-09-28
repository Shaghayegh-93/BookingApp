import React, { useRef, useState } from "react";
import {
  CalendarIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import useOutsideClick from "./hooks/useOutsideClick";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [option, setOption] = useState({ adult: 1, children: 1, room: 1 });

  const optionHandler = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "dec" ? option[name] - 1 : option[name] + 1,
      };
    });
  };

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
        <div className="flex items-center relative border md:border-none border-[#ebe9e9] rounded-3xl p-4 w-full md:w-fit cursor-pointer">
          <div
            id="optionDropDown"
            onClick={() => setIsOpenOptions(!isOpenOptions)}
          >
            {option.adult} adult &nbsp;&bull;&nbsp;{option.children}children
            &nbsp;&bull;&nbsp;{option.room}room
          </div>
          {isOpenOptions && (
            <GusetOptionList
              setIsOpenOptions={setIsOpenOptions}
              option={option}
              optionHandler={optionHandler}
            />
          )}
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

function GusetOptionList({ option, optionHandler, setIsOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setIsOpenOptions(false));
  return (
    <div
      ref={optionsRef}
      className="absolute bg-white p-4 border border-tex100 rounded-2xl top-11 md:top-10 right-0 md:-right-[55px] w-full md:w-[220px] z-10 shadow-[0,0,10px,#efefef]"
    >
      <GusetOptionItem
        option={option}
        type="adult"
        minLimit="1"
        optionHandler={optionHandler}
      />
      <GusetOptionItem
        option={option}
        type="children"
        minLimit="0"
        optionHandler={optionHandler}
      />
      <GusetOptionItem
        option={option}
        type="room"
        minLimit="1"
        optionHandler={optionHandler}
      />
    </div>
  );
}

function GusetOptionItem({ option, type, minLimit, optionHandler }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4 last:mb-0">
      <span className="inline-block flex-1 text-sm">{type}</span>
      <div className="flex items-center gap-4">
        <button
          className="inline-block p-2 rounded-lg text-tex500 bg-tex100"
          disabled={option[type] <= minLimit}
          onClick={() => optionHandler(type, "dec")}
        >
          <MinusIcon className="w-4 h-4 inline-block" />
        </button>
        <span className="inline-block">{option[type]}</span>
        <button
          className="inline-block p-2 rounded-lg text-tex500 bg-tex100"
          onClick={() => optionHandler(type, "inc")}
        >
          <PlusIcon className="w-4 h-4 inline-block" />
        </button>
      </div>
    </div>
  );
}
