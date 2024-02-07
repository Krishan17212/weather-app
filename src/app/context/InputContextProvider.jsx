"use client";
import { useState } from "react";
import InputContext from "./InputContext";

const InputContextProvider = ({ children }) => {
  const [inputText, setInputText] = useState("");
  return (
    <InputContext.Provider value={{ inputText, setInputText }}>
      {children}
    </InputContext.Provider>
  );
};

export default InputContextProvider;
