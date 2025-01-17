"use client";

import React, { useState } from "react";
import { pushSuccess, pushWarning } from "@/components/Toast";
import Button from "@/components/button";
import { TOTAL_EXERCISES } from "@/constants";

const MiniMenu = ({
  currentExNum,
  setState,
  setTotalExercises,
  handleSelect,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newExerciseNumber, setNewExerciseNumber] = useState(1);

  const handleGenerateClick = () => {
    setIsPopupOpen(true);
  };

  const handleStartExercise = () => {
    console.log("starting exercise");
    handleSelect("current"); // call passed in function
  };

  const handleConfirm = () => {
    console.log(`Generating ${newExerciseNumber} new exercises...`);
    setIsPopupOpen(false);
    // Reset newExerciseNumber after generation
    setNewExerciseNumber(newExerciseNumber);
    setTotalExercises(newExerciseNumber);
    localStorage.setItem(TOTAL_EXERCISES, newExerciseNumber);

    handleSelect("new"); // call passed in function

    pushSuccess("Generating new exercises");
    setState("exercise");
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    // Reset newExerciseNumber after cancel
    setNewExerciseNumber(1);
  };

  return (
    <>
      <div className={"h-full flex flex-col justify-center items-center"}>
        <div className={"py-4"}>
          <Button size="lg" variant="primary" onClick={handleGenerateClick}>
            Generate Anew
          </Button>
        </div>
        <div>
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              handleStartExercise();
              setState("exercise");
            }}
          >
            Start Exercise
          </Button>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Generate New Exercises
            </h2>
            <label htmlFor="exerciseNumber">Enter Exercises numbers:</label>
            <input
              type="number"
              id="exerciseNumber"
              value={newExerciseNumber}
              onChange={(e) => {
                if (Number(e.target.value) > 5) {
                  setNewExerciseNumber(5);
                  pushWarning("Please don't select more than 5 questions !!!");
                  return;
                }
                setNewExerciseNumber(Number(e.target.value));
              }}
              className="border border-gray-300 p-2 rounded mb-4"
              max={5}
            />
            <div className="flex justify-center ">
              <div className={"px-4"}>
                <Button size="lg" variant="primary" onClick={handleConfirm}>
                  Confirm
                </Button>
              </div>
              <div className={"px-4"}>
                <Button
                  size="lg"
                  variant="outline-danger"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MiniMenu;
