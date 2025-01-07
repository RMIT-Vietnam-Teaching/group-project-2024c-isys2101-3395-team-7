"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import BasePaginationList from "@/components/pagination/BasePaginationList";
import NoData from "@/components/pagination/NoData";
import { debounce } from "next/dist/server/utils";
import { pushError, pushSuccess } from "@/components/Toast";
import { addFavorite } from "@/api";
import Table from "./Table";
import { useHeader } from "@/context/HeaderContext";

const activitySearchTypes = [
  {
    id: 1,
    name: "Handwriting",
    value: "handwriting",
  },
  {
    id: 2,
    name: "Voice",
    value: "audio",
  },
  {
    id: 3,
    name: "All",
    value: "all",
  },
];

export default function AccountActivity({ records, tab }) {
  const [activeTab, setActiveTab] = useState(tab);


  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const [loading, setLoading] = useState(false);
  const [isSaved, setSave] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const searchRef = useRef(null);
  const searchTypeRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { historyData } = useHeader();
  const favoriteData = historyData.filter((item) => item.favorite);

  const handleChange = (event) => {
    const filter = event.target.value;
    setSelectedFilter(filter);
  };

  const filterData = (data, filter) => {
    if (filter === "" || filter === "all") {
      return data; // Show all data if no filter is selected
    } else {
      return data.filter((item) => item.type === filter); // Filter by type
    }
  };

// Filter history data based on selected filter
  const filteredData = filterData(historyData, selectedFilter);
// Filter favorite data
  const filteredFavoriteData = filterData(favoriteData, selectedFilter);

  const handleResetFilter = () => {
    setFilter({ searchValue: "", searchType: activitySearchTypes[0], page: 1 });
    setSelectedFilter(""); // Reset the selected filter in the dropdown
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  };
  const handleOnChangeSearch = useCallback(
      debounce((value) => {
        setFilter((prev) => {
          console.log("🚀 ~ debounce ~ prev:", prev);
          return { ...prev, searchValue: value, page: 1 };
        });
      }, 300),
      []
  );

  const handleDeleteConfirm = async (activityId) => {
    console.log("handleDeleteConfirm", activityId);
  };

  const handleAddFavorite = async (imageId) => {
    const formData = new FormData();
    !isSaved
      ? formData.append("favorite", "true")
      : formData.append("favorite", "false");
    try {
      const res = await addFavorite(formData, imageId);
      console.log("API response:", res);
    } catch (error) {
      console.error("Error adding favorite:", error);
    } finally {
      setSave(!isSaved);
    }
  };

  const [filter, setFilter] = useState({
    searchType: activitySearchTypes[0],
    page: 1,
    searchValue: "",
  });

  useEffect(() => {
    setSelectedFilter("all"); // Reset filter to All on tab change
  }, [activeTab]);


  return (
    <>
      <div className="bg-[#ffe3e3] min-h-screen p-6">
        <div className={"flex flex-row justify-between"}>
          {/* Tabs */}
          <div className="flex">
            <button
              className={`px-4 py-2 rounded-t-lg text-white ${
                activeTab === "history" ? "bg-pink" : "bg-black"
              }`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg text-white ${
                activeTab === "favorite" ? "bg-pink " : "bg-black"
              }`}
              onClick={() => setActiveTab("favorite")}
            >
              Favorite
            </button>
          </div>
          {/*Type*/}
          <div>
            <label htmlFor="filterDropdown" style={{ marginRight: "10px" }}>
              Filter by:
            </label>
            <select
              id="filterDropdown"
              value={selectedFilter}
              onChange={handleChange}
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="all">Select</option>
              <option value="handwriting">Handwriting</option>
              <option value="audio">Voice</option>
            </select>
          </div>
        </div>

        {/* Render content based on the active tab */}
        {activeTab === "history" && (
          <>
            <h2 className="mt-4 text-lg font-semibold">History</h2>
            {filteredData.length > 0 ? (
                <Table data={filteredData} />
            ) : (
                <NoData message="No matching data found." />
            )}
          </>
        )}
        {activeTab === "favorite" && (
          <>
            <h2 className="mt-4 text-lg font-semibold">Favorite</h2>
            {filteredFavoriteData.length > 0 ? (
                <Table data={filteredFavoriteData} />
            ) : (
                <NoData message="No matching data found." />
            )}
          </>
        )}
      </div>
    </>
  );
}
