"use client";
import InputContext from "@/app/context/InputContext";
import { useContext, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchForm = () => {
  const [input, setInput] = useState("");
  const { setInputText } = useContext(InputContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputText({ input });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-stretch border-2 overflow-hidden border-cyan-300 rounded-md"
    >
      <input
        type="text"
        name="city"
        className="text-md p-1 outline-none dark:bg-white dark:text-black"
        placeholder="Enter City"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className=" text-xl py-1 px-3 bg-cyan-300 text-white"
      >
        <IoSearchSharp />
      </button>
    </form>
  );
};

export default SearchForm;
