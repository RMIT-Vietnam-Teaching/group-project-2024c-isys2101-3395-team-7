'use client'
import Link from "next/link"
import GuidelineIcon from "./icons/GuidelineIcon"
import HandwritingIcon from "./icons/HandwritingIcon"
import VoiceIcon from "./icons/VoiceIcon"
import LessonIcon from "./icons/LessonIcon"
import { usePathname } from "next/navigation";
import Tooltip from "@/components/tooltip";
import ExerciseIcon from "@/components/icons/ExerciseIcon";

const iconWidth = 30, iconHeight = 30;

const NavBar = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname()
    return (
        <div className={`fixed flex flex-1 left-0 z-10 md:h-full md:w-16 w-72 bg-pink content-center md:block ${isOpen ? 'block' : 'hidden'} border-t-1 border-white`}>
            <div className="grid grid-cols-1 w-full">
                <div className={"border-black border-t"} style={{ marginTop: '4.35rem'}}>
                    <Tooltip text={"Guidelines"} position="right">
                        <Link className="w-full" href="/home"
                            onClick={() => window.location.replace("/home")}
                        >
                            <div
                                className={`p-3 hover:bg-orange grid md:grid-cols-1 grid-cols-3 justify-items-center ${pathname === '/home' ? 'bg-orange' : ''}`}>
                                <GuidelineIcon width={iconWidth} height={iconHeight} />
                                <div className="md:hidden col-span-2">Home</div>
                            </div>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip text={"Handwriting Detection and Correction"} position="right">
                        <Link className="w-full" href="/handwriting"
                            onClick={() => window.location.replace("/handwriting")}
                        >
                            <div
                                className={`p-3 hover:bg-orange border border-x-0 border-black grid md:grid-cols-1 grid-cols-3 justify-items-center ${pathname === '/handwriting' ? 'bg-orange' : ''}`}>
                                <HandwritingIcon width={iconWidth} height={iconHeight} />
                                <div className="md:hidden col-span-2">Handwriting Correction</div>
                            </div>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip text={"Voice Detection and Correction"} position="right">
                        <Link className="w-full" href="/voice"
                            onClick={() => window.location.replace("/voice")}
                        >
                            <div
                                className={`p-3 hover:bg-orange border-b border-black grid md:grid-cols-1 grid-cols-3 justify-items-center ${pathname === '/voice' ? 'bg-orange' : ''}`}>
                                <VoiceIcon width={iconWidth} height={iconHeight} />
                                <div className="md:hidden col-span-2">Voice Correction</div>
                            </div>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip text={"Lessons"} position="right">
                        <Link className="w-full" href="/lessons"
                            onClick={() => window.location.replace("/lessons")}
                        >
                            <div
                                className={`p-3 hover:bg-orange border-b border-black grid md:grid-cols-1 grid-cols-3 justify-items-center ${pathname === '#' ? 'bg-orange' : ''}`}>
                                <LessonIcon width={iconWidth} height={iconHeight} />
                                <div className="md:hidden col-span-2">Your Lessons</div>
                            </div>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip text={"Exercises"} position="right">
                        <Link className="w-full" href="/exercises"
                            onClick={() => window.location.replace("/exercises")}
                        >
                            <div
                                className={`p-3 hover:bg-orange grid md:grid-cols-1 grid-cols-3 justify-items-center ${pathname === '#' ? 'bg-orange' : ''}`}>
                                <ExerciseIcon width={iconWidth} height={iconHeight} />
                                <div className="md:hidden col-span-2">Your Exercises</div>
                            </div>
                        </Link>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default NavBar