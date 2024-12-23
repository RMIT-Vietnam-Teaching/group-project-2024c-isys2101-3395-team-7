"use client"

import Tooltip from "@/components/tooltip";
import Link from "next/link";
import ExerciseIcon from "@/components/icons/ExerciseIcon";

const iconWidth = 30, iconHeight = 30;

const FloatingSidebar = () => {
    return (
        <>
            <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-4">
                {/* Move to Top */}
                <div>
                    <Tooltip text={"Exercises"} position="right">
                        <Link href="/exercises"
                              onClick={() => window.location.replace("/exercises")}
                        >
                            <div
                                className={`p-3 hover:bg-orange grid grid-cols-3 ${pathname === '#' ? 'bg-orange' : ''}`}>
                                <ExerciseIcon width={iconWidth} height={iconHeight}/>
                                <div className="md:hidden col-span-2">Your Exercises</div>
                            </div>
                        </Link>
                    </Tooltip>
                </div>

                {/* Generate New Lessons */}
                <div>
                    <Tooltip text={"Exercises"} position="right">
                        <Link href="/exercises"
                              onClick={() => window.location.replace("/exercises")}
                        >
                            <div
                                className={`p-3 hover:bg-orange grid grid-cols-3 ${pathname === '#' ? 'bg-orange' : ''}`}>
                                <ExerciseIcon width={iconWidth} height={iconHeight}/>
                                <div className="md:hidden col-span-2">Your Exercises</div>
                            </div>
                        </Link>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}

export default FloatingSidebar;