"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { fetchRecords } from "@/api";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [favData, setFavData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  const updateHeaderData = async () => {
    try {
      if (localStorage.getItem("authToken")) {
        const res = await fetchRecords(localStorage.getItem("username"));

        // Get the 3 most recent favorite items
        // const fav = res.filter((item) => item.favorite).slice(-3);

        // Get the 3 most recent items
        // const hist = res.slice(-3);

        // setFavData(fav);
        setHistoryData(res.slice(-3));
        const fav = res.filter((item) => item.favorite).slice(-3);
        setFavData(fav);
      }
    } catch (error) {
      console.error("Failed to fetch header data:", error);
    }
  };

  useEffect(() => {
    updateHeaderData();
  }, []);

  return (
    <HeaderContext.Provider value={{ favData, historyData, updateHeaderData }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  return useContext(HeaderContext);
};
