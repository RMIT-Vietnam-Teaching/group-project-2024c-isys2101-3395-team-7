'use client'
import {useEffect, useState} from "react"
import Link from "next/link"
import GuidelineIcon from "./icons/GuidelineIcon"
import HandwritingIcon from "./icons/HandwritingIcon"
import VoiceIcon from "./icons/VoiceIcon"
import LessonIcon from "./icons/LessonIcon"
import {usePathname} from "next/navigation";

const iconWidth = 30, iconHeight = 30;

const NavBar = ({isOpen, setIsOpen}) => {
    // const [isOpen, setIsOpen] = useState(true);
    //
    // const toggleNavBar = () => {
    //     setIsOpen(!isOpen);
    // };

    const pathname = usePathname()

    return (
        <>
            {/*{isOpen && (*/}
            {/*    <div*/}
            {/*        className="fixed inset-0 z-5 bg-black bg-opacity-50 md:hidden"*/}
            {/*        onClick={() => setIsOpen(false)}*/}
            {/*    ></div>*/}
            {/*)}*/}
            {/*<button onClick={toggleNavBar} className="md:hidden text-2xl bg-[#CE5A67] p-4 pt-3">*/}
            {/*    ☰*/}
            {/*</button>*/}
            <div
                // onClick={() => setIsOpen(!isOpen)}
                className={`flex flex-1 relative left-0 z-10 md:h-full md:max-w-16 w-full bg-[#CE5A67] content-center md:block ${isOpen ? 'block' : 'hidden'}`}>
                {/*className={`flex flex-1 relative left-0 z-10 md:h-full md:max-w-16 w-full bg-[#CE5A67] content-center md:block`}>*/}
                <div className="grid grid-cols-1">
                    <div>
                        <Link href="/home"
                              >
                              {/*// onClick={() => setIsOpen(!isOpen)}>*/}
                              {/*onClick={() => { setIsOpen(false) }}>*/}
                            <div className={`p-3 hover:bg-[#F4BF96] grid grid-cols-3 ${pathname === '/home' ? 'bg-orange' : ''}`}>
                                <GuidelineIcon width={iconWidth} height={iconHeight} />
                                <div className="md:hidden col-span-2">Home</div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link href="/handwriting"
                              // onClick={() => { setIsOpen(false) }}
                            >
                            <div className={` p-3 hover:bg-[#F4BF96] border border-x-0 border-black grid grid-cols-3 ${pathname === '/handwriting' ? 'bg-orange' : ''}`}>
                                <HandwritingIcon width={iconWidth} height={iconHeight} />
                                <div className="md:hidden col-span-2">Handwriting Correction</div>
                            </div>
                        </Link>
                    </div>
                    <div><Link href="/voice"
                               // onClick={() => { setIsOpen(false) }}
                    >
                        <div className={`p-3 hover:bg-[#F4BF96] border-b border-black grid grid-cols-3 ${pathname === '/voice' ? 'bg-orange' : ''}`}>
                            <VoiceIcon width={iconWidth} height={iconHeight} />
                            <div className="md:hidden col-span-2">Voice Correction</div>
                        </div>
                    </Link></div>
                    <div>
                        <Link href="/home"
                              // onClick={() => { setIsOpen(false) }}
                        >
                            <div className={`p-3 hover:bg-[#F4BF96] grid grid-cols-3 ${pathname === '#' ? 'bg-orange' : ''}`}>
                                <LessonIcon width={iconWidth} height={iconHeight} />
                                <div className="md:hidden col-span-2">Your Lessons</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar