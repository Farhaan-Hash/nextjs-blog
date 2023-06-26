"use client";
import React, {createContext, useContext, useState} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [mode, setMode] = useState("dark");

  const toggle = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{mode, toggle}}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
