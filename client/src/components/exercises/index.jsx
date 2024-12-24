"use client"

import MiniHeader from "@/components/exercises/MiniHeader";
import Button from "@/components/button";
import React, {useState} from "react";
import {pushSuccess} from "@/components/Toast";
import MiniMenu from "@/components/exercises/MiniMenu";
import Exercise from "@/components/exercises/Exercise";
import CircularProgress from "@/components/CircularProgress";

export default function Exercises() {
    const [currentView, setCurrentView] = useState("generateNew"); // Initialize state

    const [isLoading, setIsLoading] = useState(false);

    const handleNewExercises = async () => {
        setIsLoading(true); // Set isLoading to true before fetching data

        // Simulate data fetching with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // After the delay, update the state
        setCurrentView("exercise");
        setIsLoading(false);
    };

    return (
        <>
            <div className={"flex flex-col min-h-screen w-2/3 justify-items-start border-l border-r border-black mx-auto"}>
                <div className={"w-full h-30"}>
                    <MiniHeader
                    state={currentView}
                    />
                </div>
                <div className={"w-full h-full overflow-y-auto"}>
                    {isLoading ? (
                        <div className="flex flex-col items-center">
                            <CircularProgress size="lg"/>
                            <span className="text-sm mt-2">Loading...</span>
                        </div>
                    ) : (
                        <>
                            {currentView === "generateNew" ? (
                                <MiniMenu/>) : (
                                <Exercise/>
                            )
                            }
                        </>

                    )}
                </div>
            </div>
        </>
    )
}