"use client"

import Tooltip from "@/components/tooltip";
import Link from "next/link";
import ExerciseIcon from "@/components/icons/ExerciseIcon";
import GoToTopIcon from "@/components/icons/GoToTopIcon";
import GenerateIcon from "@/components/icons/GeneratIcon";
import React, { useState } from "react";
import { pushSuccess } from "@/components/Toast";
import Button from "@/components/button";

const iconWidth = 30, iconHeight = 30;

const FloatingSidebar = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newLessonNumber, setNewLessonNumber] = useState(1);

    const handleGenerateClick = () => {
        setIsPopupOpen(true);
    };

    const handleConfirm = () => {
        // Logic to generate new lessons based on newLessonNumber
        console.log(`Generating ${newLessonNumber} new lessons...`);
        setIsPopupOpen(false);
        // Reset newLessonNumber after generation
        setNewLessonNumber(1);
        pushSuccess("Generating new lessons");
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
        // Reset newLessonNumber after cancel
        setNewLessonNumber(1);
    };

    return (
        <>
            <div className={`flex flex-col justify-center items-center relative h-screen w-16 bg-black content-center md:block border-t-2 border-white`}>

                <div className="grid grid-cols-1 place-items-center">
                    {/* Move to Top */}
                    <div className={"z-10"}>
                        <Tooltip text={"Go To Top"} position="left">
                            <a href="#1"
                            >
                                <div
                                    className={`p-3 hover:bg-orange grid grid-cols-3 border-white border-t`}>
                                    <GoToTopIcon width={iconWidth} height={iconHeight} />
                                </div>
                            </a>
                        </Tooltip>
                    </div>

                    {/* Generate New Lessons */}
                    <div className={"z-10"}>
                        <Tooltip text={"Generate New Lessons"} position="left">
                            <div
                                className={`p-3 hover:bg-orange grid grid-cols-3 border-t border-b border-white content-center items-center self-center`}
                                onClick={handleGenerateClick}
                            >
                                <GenerateIcon width={iconWidth} height={iconHeight} />
                            </div>
                        </Tooltip>
                    </div>

                    {isPopupOpen && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg">
                                <h2 className="text-lg font-semibold mb-4">Generate New Lessons</h2>
                                <label htmlFor="lessonNumber">Number of Lessons:</label>
                                <input
                                    type="number"
                                    id="lessonNumber"
                                    value={newLessonNumber}
                                    onChange={(e) => setNewLessonNumber(Number(e.target.value))}
                                    className="border border-gray-300 p-2 rounded mb-4"
                                />
                                <div className="flex justify-center ">
                                    <div className={"px-4"}>
                                        <Button
                                            size="lg"
                                            variant="primary"
                                            onClick={handleConfirm}
                                        >
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
                </div>
            </div>
        </>
    )
}

export default FloatingSidebar;