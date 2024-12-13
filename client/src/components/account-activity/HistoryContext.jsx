'use client'
import React, {createContext, useEffect, useState} from "react";


// TODO: awaiting database

// processing history and saved translations from database


const HistoryContext = createContext();

const HistoryProvider = ({children}) => {
    const [history, setHistory] = useState([]);
    const [unstarredHistory, setUnstarredHistory] = useState(0);
    const [open, setOpen] = useState(false)

    // fetch history from backend
    const fetchHistory = async () => {
        try {
            console.log('bug')
            const response1 = await fetch('', {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (!response1.ok) {
                throw new Error(`HTTP error! status: ${response1.status}`);
            }
            const historyData = await response1.json();
            console.log('Fetched result for historyData from HistoryContext: ', historyData);

            // set unstarred history
            setUnstarredHistory(historyData);
        } catch (error) {
            console.error('Error fetching history:', error.message);
        }
    }

    // Function to mark a history as a starred history (favorite translation)
    const markAsFavorite = async (historyId) => {
        try {
            // Send request to update the history status to "starred"
            const response = await fetch(
                `http://localhost:3000/api/history/${historyId}/starred`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to star history.`);
            }

            const updatedHistory = await response.json();
            console.log('History marked as favorite:', updatedHistory);
            fetchHistory()
        } catch (error) {
            console.error("Error marking history as favorite:", error.message);
        }
    }

    useEffect(() => {
        fetchHistory()
        const intervalId = setInterval(() => {
            fetchHistory()
            console.log('after 60 seconds:')
        }, 5000); // fetch history every 5 seconds
        return () => clearInterval(intervalId); // Cleanup on component unmount

    }, []);

    const value = {
        history,
        unstarredHistory,
        markAsFavorite,
        setOpen,
        open
    }

    return (
        <HistoryContext.Provider value={value}>
            {children}
        </HistoryContext.Provider>
    )
}

export default HistoryProvider;
export {HistoryContext};