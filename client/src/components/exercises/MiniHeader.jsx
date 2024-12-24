"use client"

import Tooltip from "@/components/tooltip";
import React, {useState} from "react";
import ReturnIcon from "@/components/icons/ReturnIcon";
import NextIcon from "@/components/icons/NextIcon";

const iconWidth = 30, iconHeight = 30;

const MiniHeader = () => {
    const [currentExercise, setCurrentExercise] = useState(NaN)
    const [totalExercises, setTotalExercises] = useState(NaN)

    return (
        <>
            <div className={"flex flex-row w-full h-1/4 top border-black border-b justify-between"}>
                {/*    left*/}
                <div className={"flex flex-1 justify-start"}>
                    <div className={"flex items-center justify-center px-10"}>
                        <span>Exercises: {totalExercises}</span>
                    </div>
                    <div className={"flex items-center justify-center px-10"}>
                        <span>Current Exercise: {currentExercise}</span>
                    </div>
                </div>
                {/*    right*/}

                <div className={"flex flex-1 justify-end"}>
                    {/* Return*/}
                    <div className={"z-10"}>
                        <Tooltip text={"Return to Exercise Menu"} position="bottom">
                            <div
                                className={`p-3 focus:ring-1 content-center items-center self-center 
                                 hover:scale-105 transition-transform duration-150`}
                            >
                                <ReturnIcon width={iconWidth} height={iconHeight}/>
                            </div>
                        </Tooltip>
                    </div>
                    {/* Next Exercise*/}
                    <div className={"z-10"}>
                        <Tooltip text={"Next Exercise"} position="bottom">
                            <div
                                className={`p-3 focus:ring-1 content-center items-center self-center 
                                 hover:scale-105 transition-transform duration-150`}
                            >
                                <NextIcon width={iconWidth} height={iconHeight}/>
                            </div>
                        </Tooltip>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MiniHeader;