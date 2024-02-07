"use client";
import { useTheme } from "next-themes";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const darkMode = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <button className="text-3xl" onClick={darkMode}>
      {theme == "light" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};

export default ThemeToggler;
