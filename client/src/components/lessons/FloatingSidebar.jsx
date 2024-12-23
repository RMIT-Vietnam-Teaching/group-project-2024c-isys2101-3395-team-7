"use client"

import Tooltip from "@/components/tooltip";
import Link from "next/link";
import ExerciseIcon from "@/components/icons/ExerciseIcon";
import GoToTopIcon from "@/components/icons/GoToTopIcon";
import GenerateIcon from "@/components/icons/GeneratIcon";

const iconWidth = 30, iconHeight = 30;

const FloatingSidebar = () => {
    return (
        <>
            <div className={`flex flex-1 relative left-0 z-10 md:h-full md:max-w-16 w-72 bg-black content-center md:block border-t-2 border-white`}>

                <div className="grid grid-cols-1 bg-black text-white h-screen p-4">
                    {/* Move to Top */}
                    <div>
                        <Tooltip text={"Go To Top"} position="right">
                            <a href="#lesson1"
                            >
                                <div
                                    className={`p-3 hover:bg-orange grid grid-cols-3`}>
                                    <GoToTopIcon width={iconWidth} height={iconHeight}/>
                                </div>
                            </a>
                        </Tooltip>
                    </div>

                    {/* Generate New Lessons */}
                    <div>
                        <Tooltip text={"Generate New Lessons"} position="right">
                            <div
                                className={`p-3 hover:bg-orange grid grid-cols-3`}
                                onClick={() => {console.log("Generate New Lessons")}}
                            >
                                <GenerateIcon width={iconWidth} height={iconHeight}/>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FloatingSidebar;