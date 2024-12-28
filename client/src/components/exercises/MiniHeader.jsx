"use client"

import Tooltip from "@/components/tooltip";
import React, { useState } from "react";
import ReturnIcon from "@/components/icons/ReturnIcon";
import NextIcon from "@/components/icons/NextIcon";

const iconWidth = 30, iconHeight = 30;

const MiniHeader = ({ state, currQuestion, setCurrQuestion, totalExercises }) => {
    // const [totalExercises, setTotalExercises] = useState(5)
    const [currentView, setCurrentView] = useState(" ")

    const handleReturnClick = () => {
        setCurrentView("generateNew")
        window?.location.reload();
        console.log("returning");
    }

    const handleNextClick = () => {
        if (currQuestion == totalExercises - 1) {
            return
        }
        setCurrQuestion(currQuestion + 1)
        console.log("next");
    }

    return (
        <>
            <div className={"flex flex-row w-full h-16 top border-black border-b justify-between"}>
                {/*    left*/}
                <div className={"flex flex-1 justify-start"}>
                    <div className={"flex items-center justify-center px-10"}>
                        <span>Exercises: {totalExercises}</span>
                    </div>
                    <div className={"flex items-center justify-center px-10"}>
                        <span>Current Exercise: {state == "generateNew" ? 0 : currQuestion + 1}</span>
                    </div>
                </div>
                {/*    right*/}
                {state === "exercise"
                    ? (
                        <div className={"flex flex-1 justify-end"}>
                            {/* Return*/}
                            <div className={"z-10"}>
                                <Tooltip text={"Return to Exercise Menu"} position="bottom">
                                    <div
                                        onClick={handleReturnClick}
                                        className={`p-3 focus:ring-1 content-center items-center self-center 
                                 hover:scale-105 transition-transform duration-150`}
                                    >
                                        <ReturnIcon width={iconWidth} height={iconHeight} />
                                    </div>
                                </Tooltip>
                            </div>
                            {/* Next Exercise*/}
                            <div className={"z-10"}>
                                <Tooltip text={"Next Exercise"} position="bottom">
                                    <div
                                        onClick={handleNextClick}
                                        className={`p-3 focus:ring-1 content-center items-center self-center 
                                 hover:scale-105 transition-transform duration-150`}
                                    >
                                        <NextIcon width={iconWidth} height={iconHeight} />
                                    </div>
                                </Tooltip>
                            </div>

                        </div>
                    ) : (
                        <div className={"flex flex-1 justify-start"}>
                        </div>
                    )}

            </div>
        </>
    )
}

export default MiniHeader;