"use client"
import {useCallback, useEffect, useRef, useState} from "react";
import BasePaginationList from "@/components/pagination/BasePaginationList";
import NoData from "@/components/pagination/NoData";
import {debounce} from "next/dist/server/utils";
import {pushError, pushSuccess} from "@/components/Toast";
import WrapperFilter from "@/components/pagination/WrapperFilter";
import StarIcon from "@/components/icons/StarIcon";
import CancelIcon from "@/components/icons/CancelIcon";


const activitySearchTypes = [
    {
        id: 1,
        name: "Handwriting",
        value: "handwriting",
    },
    {
        id: 2,
        name: "Voice",
        value: "voice",
    }
];

export default function AccountActivity() {
    const pageSize = 5;
    const [activeTab, setActiveTab] = useState("history");
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false)
    const [paging, setPaging] = useState({
        data: [],
        totalCount: 0,
        totalPages: 0,
    });


    const searchRef = useRef(null);
    const searchTypeRef = useRef(null);
    const [selectedFilter, setSelectedFilter] = useState("");
    const handleChange = (event) => {
        const filter = event.target.value;
        setSelectedFilter(filter);
    };
    const handleResetFilter = () => {
        setFilter({ searchValue: "", searchType: activitySearchTypes[0], page: 1 });
        if (searchRef.current) {
            searchRef.current.value = "";
        }
    };
    const handleOnChangeSearch = useCallback(
        debounce((value) => {
            setFilter((prev) => {
                console.log("🚀 ~ debounce ~ prev:", prev)
                return ({ ...prev, searchValue: value, page: 1 })
            })
        }, 300),
        []
    );

    const handleDeleteConfirm = async (activityId) => {
        try {
            const url = new URL(
                `${baseUrl}/api/activitys/${activityId}`
            );
            const response = await fetch(url, {
                method: "Delete",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                pushSuccess("Delete activity successfully");
                fetchActivities();
            } else {
                pushError("Failed to delete activity");
                throw new Error("Failed to delete activity");
            }
        } catch (error) {
            pushError("Failed to delete activity");
        }
    };


    // const fetchActivities = async () => {
    //     setLoading(true);
    //     const url = new URL(`${baseUrl}/api/activitys/list`);
    //     url.searchParams.append("page", filter.page);
    //     url.searchParams.append("limit", pageSize);
    //     url.searchParams.append("search", filter.searchValue);
    //     url.searchParams.append("searchType", filter.searchType);
    //
    //     return fetch(url, {
    //         credentials: "include",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 pushError("Failed to get list activitys");
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setPaging(data);
    //         })
    //         .catch((error) => {
    //             pushError(error);
    //             setLoading(false);
    //         })
    //         .finally(() => setLoading(false));
    // };

    // useEffect(() => {
    //     fetchActivities();
    // }, [filter.page, filter.searchValue, filter.status, filter.role]);


    const [filter, setFilter] = useState({
        searchType: activitySearchTypes[0],
        page: 1,
        searchValue: "",
    });

    const historyData = [
        {
            correctedText: "[Corrected History Text]",
            transcribedText: "[Transcribed History Text]",
            timestamp: "[timestamp]",
            type: "Voice Correction",
        },
        {
            correctedText: "[Corrected History Text]",
            transcribedText: "[Transcribed History Text]",
            timestamp: "[timestamp]",
            type: "Handwriting Correction",
        },
    ];

    const favoriteData = [
        {
            correctedText: "[Favorite Corrected Text]",
            transcribedText: "[Favorite Transcribed Text]",
            timestamp: "[timestamp]",
            type: "Voice Correction",
        },
        {
            correctedText: "[Favorite Corrected Text]",
            transcribedText: "[Favorite Transcribed Text]",
            timestamp: "[timestamp]",
            type: "Handwriting Correction",
        },
    ];

    const renderTable = (data) => (
        <div className="mt-6 bg-pink text-white rounded-lg shadow-md">
            <div className="grid grid-cols-5 p-4 font-bold">
                <div>Corrected Text</div>
                <div>Transcribed Text</div>
                <div>Timestamp</div>
                <div>Type</div>
                <div>Actions</div>
            </div>
            {data.map((item, index) => (
                <div
                    key={index}
                    className="grid grid-cols-5 p-4 border-t border-black"
                >
                    <div>{item.correctedText}</div>
                    <div>{item.transcribedText}</div>
                    <div>{item.timestamp}</div>
                    <div>{item.type}</div>
                    <div className="flex space-x-2">
                        <div>
                            <StarIcon isFilled={isSaved} style={{ marginRight: "5px" }} />
                        </div>
                        <div>
                            <CancelIcon width={20} height={20} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    return (
        <>
            <div className="bg-[#ffe3e3] min-h-screen p-6">
                {/* Tabs */}
                <div className="flex space-x-4">
                    <button
                        className={`px-4 py-2 rounded ${
                            activeTab === "history" ? "bg-[#c94d4d] text-white" : "bg-[#ffa3a3]"
                        }`}
                        onClick={() => setActiveTab("history")}
                    >
                        History
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            activeTab === "favorite" ? "bg-[#c94d4d] text-white" : "bg-[#ffa3a3]"
                        }`}
                        onClick={() => setActiveTab("favorite")}
                    >
                        Favorite
                    </button>
                </div>

                {/* Render content based on the active tab */}
                {activeTab === "history" && (
                    <>
                        <h2 className="mt-4 text-lg font-semibold">History</h2>
                        {renderTable(historyData)}
                    </>
                )}
                {activeTab === "favorite" && (
                    <>
                        <h2 className="mt-4 text-lg font-semibold">Favorite</h2>
                        {renderTable(favoriteData)}
                    </>
                )}
                {/*Type*/}
                <div>
                    <label htmlFor="filterDropdown" style={{marginRight: "10px"}}>
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
                        <option value="">Select</option>
                        <option value="handwriting">Handwriting</option>
                        <option value="voice">Voice</option>
                    </select>
                </div>

                {/*<div style={{*/}
                {/*    height: "100%",*/}
                {/*    display: "flex",*/}
                {/*    flexDirection: "column",*/}
                {/*}}>*/}
                {/*    <div style={{ margin: "16px" }}>*/}
                {/*        <WrapperFilter*/}
                {/*            onReset={handleResetFilter}*/}
                {/*            customAction={*/}
                {/*                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "16px" }}>*/}
                {/*                    <select*/}
                {/*                        className="form-select block w-[200px] cursor-pointer bg-white border border-grey-300 text-black text-sm rounded-md py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"*/}
                {/*                        ref={searchTypeRef}*/}
                {/*                        onChange={(e) => {*/}
                {/*                            setFilter((prev) => {*/}
                {/*                                return { ...prev, searchType: e.target.value };*/}
                {/*                            });*/}
                {/*                        }}*/}
                {/*                    >*/}
                {/*                        {activitySearchTypes.map((type) => (*/}
                {/*                            <option key={type.value} value={type.value}>*/}
                {/*                                {type.name}*/}
                {/*                            </option>*/}
                {/*                        ))}*/}
                {/*                    </select>*/}
                {/*                    <TextField*/}
                {/*                        placeholder="Search"*/}
                {/*                        aria-label="Search"*/}
                {/*                        ref={searchRef}*/}
                {/*                        onChange={(e) => {*/}
                {/*                            handleOnChangeSearch(e.target.value);*/}
                {/*                        }}*/}
                {/*                    />*/}
                {/*                </div>*/}

                {/*            }*/}
                {/*        >*/}
                {/*        </WrapperFilter>*/}
                {/*    </div>*/}


                {/*/!*    Pagination*!/*/}
                {/*    <BasePaginationList*/}
                {/*        titleTotal="Total activities"*/}
                {/*        totalItems={paging.totalCount}*/}
                {/*        list={paging.data}*/}
                {/*        loading={loading}*/}
                {/*        renderItem={(activity) => (*/}
                {/*            <PostItem*/}
                {/*                key={activity.id}*/}
                {/*                activity={activity}*/}
                {/*                handleDeleteConfirm={(activityId) => handleDeleteConfirm(activityId)}*/}
                {/*            />*/}
                {/*        )}*/}
                {/*        totalPages={paging.totalPages}*/}
                {/*        page={filter.page}*/}
                {/*        onChangePage={(page) => setFilter((prev) => ({ ...prev, page }))}*/}
                {/*        renderEmpty={() => <NoData>No Data</NoData>}*/}
                {/*    />*/}
            </div>
        </>
    )
}