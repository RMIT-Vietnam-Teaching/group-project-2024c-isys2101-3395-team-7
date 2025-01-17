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

        Array.isArray(res) ? setHistoryData(res) : setHistoryData([]);

        const fav = Array.isArray(res) ? res.filter((item) => item.favorite == true) : [];
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
