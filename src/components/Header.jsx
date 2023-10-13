import React, { useRef, useState } from "react";
import {
  CalendarIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import useOutsideClick from "./hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  Link,
  NavLink,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [option, setOption] = useState({ adult: 1, children: 0, room: 1 });
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const navigate = useNavigate();

  const optionHandler = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "dec" ? option[name] - 1 : option[name] + 1,
      };
    });
  };
  const searchHandler = () => {
    const encodedPrams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      option: JSON.stringify(option),
    });
    navigate({ pathname: "/hotels", search: encodedPrams.toString() });
    // setSearchParams("");
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <NavLink to="/bookmark">Bookmarks</NavLink>
      <div className="w-full max-w-[900px] flex  flex-col md:flex-row items-center justify-between gap-2 md:border border-[#ebe9e9] rounded-3xl p-4">
        <div className="flex items-center relative border md:border-none border-[#ebe9e9] rounded-3xl w-full md:w-fit">
          <MapPinIcon className="text-rose500 w-6 h-6 inline-block " />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where to go"
            className="text-base py-3 px-2 outline-none"
          />
          <span className="hidden md:inline-block h-[30px] w-[1px] bg-tex400 my-0 mx-4"></span>
        </div>
        <div className="flex z-[1000] items-center relative border md:border-none border-[#ebe9e9] rounded-3xl p-4 w-full md:w-fit cursor-pointer">
          <CalendarIcon className=" w-6 h-6 inline-block text-primar700 " />

          <div
            className="ml-2 text-sm"
            onClick={() => setIsDateOpen(!isDateOpen)}
          >
            {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )} `}
          </div>
          {isDateOpen && (
            <DateRange
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
              className="absolute top-12 -left-1 z-20"
            />
          )}
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
          <button
            onClick={searchHandler}
            className="flex items-center justify-center bg-primar600 text-white rounded-2xl p-2 "
          >
            <MagnifyingGlassIcon className=" w-6 h-6 inline-block" />
          </button>
        </div>
      </div>
      <User />
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
      className="absolute bg-white p-4 border border-tex100 rounded-2xl top-11 md:top-10 right-0 md:-right-[55px] w-full md:w-[220px] z-[1000] shadow-[0,0,10px,#efefef]"
    >
      <GusetOptionItem
        option={option}
        type="adult"
        minLimit={1}
        optionHandler={optionHandler}
      />
      <GusetOptionItem
        option={option}
        type="children"
        minLimit={0}
        optionHandler={optionHandler}
      />
      <GusetOptionItem
        option={option}
        type="room"
        minLimit={1}
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

function User() {
  const { user, logout, isAthenticated } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      {isAthenticated ? (
        <div>
          <span className="font-bold">{user.name}</span>
          <button onClick={logoutHandler}>
            &nbsp;
            <ArrowLeftCircleIcon className="w-4 h-4 inline-block text-red-500" />
          </button>
        </div>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
}
