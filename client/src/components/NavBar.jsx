'use client'
import { useState } from "react"
import Link from "next/link"
import GuidelineIcon from "./icons/GuidelineIcon"
import HandwritingIcon from "./icons/HandwritingIcon"
import VoiceIcon from "./icons/VoiceIcon"
import LessonIcon from "./icons/LessonIcon"

const iconWidth = 40, iconHeight = 40;

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button onClick={toggleNavBar} className="md:hidden text-2xl bg-[#CE5A67] p-4 pt-3">
                ☰
            </button>
            <div className={`absolute md:h-full md:max-w-20 w-full bg-[#CE5A67] content-center md:block ${isOpen ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1">
                    <div>
                        <Link href="/home" onClick={() => { setIsOpen(false) }}>
                            <div className="p-4 hover:bg-[#F4BF96] grid grid-cols-3">
                                <GuidelineIcon width={iconWidth} height={iconHeight} />
                                <div className="md:hidden col-span-2">Home</div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link href="/handwriting" onClick={() => { setIsOpen(false) }}>
                            <div className=" p-4 hover:bg-[#F4BF96] border border-x-0 border-black grid grid-cols-3">
                                <HandwritingIcon width={iconWidth} height={iconHeight} />
                                <div className="md:hidden col-span-2">Handwriting Correction</div>
                            </div>
                        </Link>
                    </div>
                    <div><Link href="/voice" onClick={() => { setIsOpen(false) }}>
                        <div className="p-4 hover:bg-[#F4BF96] border-b border-black grid grid-cols-3">
                            <VoiceIcon width={iconWidth} height={iconHeight} />
                            <div className="md:hidden col-span-2">Voice Correction</div>
                        </div>
                    </Link></div>
                    <div>
                        <Link href="/home" onClick={() => { setIsOpen(false) }}>
                            <div className="p-4 hover:bg-[#F4BF96] grid grid-cols-3">
                                <LessonIcon width={iconWidth} height={iconHeight} />
                                <div className="md:hidden col-span-2">Your Lessons</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div></>

    )
}

export default NavBar