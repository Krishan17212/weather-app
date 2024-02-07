"use client";
import { FaSun } from "react-icons/fa";
import ThemeToggler from "./ThemeToggler";
import { MdOutlineMyLocation } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import SearchForm from "./SearchForm";
import { useContext } from "react";
import InputContext from "@/app/context/InputContext";
import axios from "axios";

const Navbar = () => {
  const { inputText, setInputText } = useContext(InputContext);
  const cityName = inputText.input || "Delhi";

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&cnt=56`
          );

          setTimeout(() => {
            setInputText(response);
          });
        } catch (error) {}
      });
    }
  }

  return (
    <header className="py-8 bg-white dark:bg-slate-800 sticky top-0 shadow-md w-full z-10">
      <div className="container flex justify-between items-center gap-4">
        <div className="left_side flex gap-2 items-center">
          <span className="text-3xl font-bold">Weather</span>
          <span className="icon text-3xl text-yellow-300">
            <FaSun />
          </span>
        </div>
        <div className="right_side flex items-center gap-3">
          <div className="search flex items-center gap-2">
            <div className="curr_loc text-3xl cursor-pointer">
              <MdOutlineMyLocation onClick={getCurrentLocation} />
            </div>
            <div className="search_loc text-3xl flex items-center gap-1">
              <MdLocationOn />
              <p className="m-0 text-xl">{cityName}</p>
            </div>
            <div className="search_input hidden md:block">
              <SearchForm />
            </div>
          </div>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
