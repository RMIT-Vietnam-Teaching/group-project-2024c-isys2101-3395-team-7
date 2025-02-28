"use client";

import MiniHeader from "@/components/exercises/MiniHeader";
import React, { useState } from "react";
import { pushSuccess } from "@/components/Toast";
import MiniMenu from "@/components/exercises/MiniMenu";
import Exercise from "@/components/exercises/Exercise";
import CircularProgress from "@/components/CircularProgress";
import {
  fetchRecords,
  getKeywords,
  getExercises,
  fetchAllExercises,
  addCurrentExercises,
  getCurrentExercises,
} from "@/api";
import { TOTAL_EXERCISES } from "@/constants";

import { sampleQuestions } from "@/constants"; // sample for data fetched from api

export default function Exercises() {
  const [currentView, setCurrentView] = useState("generateNew"); // initialize state
  const [currQuestion, setCurrQuestion] = useState(0);
  const [totalExercises, setTotalExercises] = useState(
    sampleQuestions?.length || 0
  );
  const [exercises, setExercises] = useState(); // exercise object fetched from api
  const [isLoading, setIsLoading] = useState(false);

  const generateNewExercises = async (type) => {
    const records = await fetchRecords(localStorage.getItem("username"));
    console.log("Records:", records);
    const keywords = await getKeywords(records);
    const allExercises = await fetchAllExercises();
    let exerciseIds = await getExercises(keywords, allExercises);

    // Clean and parse the exerciseIds
    exerciseIds = exerciseIds
      .filter(
        (id) =>
          (id.trim().startsWith('"') && id.trim().endsWith('"')) ||
          id.trim().endsWith('",')
      ) // Filter valid IDs
      .map((id) => id.replace(/["",]/g, "").trim()); // Remove quotes, commas, and trim whitespace

    console.log("Exercise IDs:", exerciseIds);
    // Filter allExercises by exerciseIds
    const filteredExercises = allExercises.filter((exercise) =>
      exerciseIds.includes(exercise._id)
    );

    console.log("Filtered Exercises:", filteredExercises);
    addCurrentExercises(
      JSON.parse(localStorage.getItem("member")),
      filteredExercises
    );
    return filteredExercises;
  };

  const fetchCurrentExercises = async () => {
    const currentExercises = await getCurrentExercises(
      JSON.parse(localStorage.getItem("member"))
    );
    setTotalExercises(currentExercises.length);
    return currentExercises;
  };

  const handleFetchExercises = async (type) => {
    setIsLoading(true); // set isLoading to true before fetching data

    let loadedExercises;
    if (type === "new") {
      loadedExercises = await generateNewExercises();
    } else if (type === "current") {
      loadedExercises = await fetchCurrentExercises();
      setTotalExercises(localStorage.getItem(TOTAL_EXERCISES) || loadedExercises.length);
    }
    setExercises(loadedExercises);

    // update the state
    setCurrentView("exercise");
    setIsLoading(false);
  };

  return (
    <>
      <div
        className={
          "flex flex-col min-h-screen w-2/3 justify-items-start border-l border-r border-black mx-auto"
        }
      >
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
                <MiniMenu
                  setState={setCurrentView}
                  setTotalExercises={setTotalExercises}
                  handleSelect={handleFetchExercises}
                />
              ) : (
                <Exercise currQuestion={currQuestion} exercises={exercises} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
