"use client"

import MiniHeader from "@/components/exercises/MiniHeader";
import React, { useState } from "react";
import { pushSuccess } from "@/components/Toast";
import MiniMenu from "@/components/exercises/MiniMenu";
import Exercise from "@/components/exercises/Exercise";
import CircularProgress from "@/components/CircularProgress";
import { fetchCurrentExercises, generateNewExercises } from "@/api";

import { sampleQuestions } from "@/constants";      // sample for data fetched from api

export default function Exercises() {
    const [currentView, setCurrentView] = useState("generateNew"); // initialize state
    const [currQuestion, setCurrQuestion] = useState(0);
    const [totalExercises, setTotalExercises] = useState(sampleQuestions?.length || 0);
    const [exercises, setExercises] = useState();       // exercise object fetched from api
    const [isLoading, setIsLoading] = useState(false);

    const handleFetchExercises = async (type) => {
        setIsLoading(true); // set isLoading to true before fetching data

        let loadedExercises;
        if (type === "new") {
            loadedExercises = await generateNewExercises();
        } else if (type === "current") {
            loadedExercises = await fetchCurrentExercises();
        }
        setExercises(loadedExercises);

        // update the state
        setCurrentView("exercise");
        setIsLoading(false);
    };

    return (
        <>
            <div className={"flex flex-col min-h-screen w-2/3 justify-items-start border-l border-r border-black mx-auto"}>
                <div className={"w-full h-30"}>
                    <MiniHeader
                        state={currentView}
                        currQuestion={currQuestion}
                        setCurrQuestion={setCurrQuestion}
                        totalExercises={totalExercises}
                    />
                </div>
                <div className={"w-full h-full overflow-y-auto"}>
                    {isLoading ? (
                        <div className="flex flex-col items-center">
                            <CircularProgress size="lg" />
                            <span className="text-sm mt-2">Loading...</span>
                        </div>
                    ) : (
                        <>
                            {currentView === "generateNew" ? (
                                <MiniMenu setState={setCurrentView} setTotalExercises={setTotalExercises} handleSelect={handleFetchExercises} />) : (
                                <Exercise currQuestion={currQuestion} exercises={sampleQuestions} />
                            )
                            }
                        </>
                    )}
                </div>
            </div>
        </>
    )
}