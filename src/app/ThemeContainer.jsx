"use client";
import { ThemeProvider } from "next-themes";

const ThemeContainer = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default ThemeContainer;
