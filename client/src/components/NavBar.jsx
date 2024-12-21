'use client'
import Link from "next/link"
import GuidelineIcon from "./icons/GuidelineIcon"
import HandwritingIcon from "./icons/HandwritingIcon"
import VoiceIcon from "./icons/VoiceIcon"
import LessonIcon from "./icons/LessonIcon"
import { usePathname } from "next/navigation";
import Tooltip from "@/components/tooltip";

const iconWidth = 30, iconHeight = 30;

const NavBar = ({ isOpen, setIsOpen }) => {
    // const [isOpen, setIsOpen] = useState(true);
    //
    // const toggleNavBar = () => {
    //     setIsOpen(!isOpen);
    // };

    const pathname = usePathname()

    return (
        <>
            {/*<button onClick={toggleNavBar} className="md:hidden text-2xl bg-[#CE5A67] p-4 pt-3">*/}
            {/*    ☰*/}
            {/*</button>*/}
            <div
                // onClick={() => setIsOpen(!isOpen)}
                className={`flex flex-1 relative left-0 z-10 md:h-full md:max-w-16 w-72 bg-pink content-center md:block ${isOpen ? 'block' : 'hidden'} border-t-2 border-white`}>
                <div className="grid grid-cols-1 w-full">
                    <div>
                        <Tooltip text={"Guidelines"} position="right">
                            <Link href="/home"
                                  onClick={() => window.location.replace("/home")}
                            >
                                <div className={`p-3 hover:bg-orange grid grid-cols-3 ${pathname === '/home' ? 'bg-orange' : ''}`}>
                                    <GuidelineIcon width={iconWidth} height={iconHeight} />
                                    <div className="md:hidden col-span-2">Home</div>
                                </div>
                            </Link>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip text={"Handwriting Detection and Correction"} position="right">
                            <Link href="/handwriting"
                                onClick={() => window.location.replace("/handwriting")}
                            >
                                <div className={`p-3 hover:bg-orange border border-x-0 border-black grid grid-cols-3 ${pathname === '/handwriting' ? 'bg-orange' : ''}`}>
                                    <HandwritingIcon width={iconWidth} height={iconHeight} />
                                    <div className="md:hidden col-span-2">Handwriting Correction</div>
                                </div>
                            </Link>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip text={"Voice Detection and Correction"} position="right">
                            <Link href="/voice"
                            onClick={() => window.location.replace("/voice")}
                            >
                                <div className={`p-3 hover:bg-orange border-b border-black grid grid-cols-3 ${pathname === '/voice' ? 'bg-orange' : ''}`}>
                                    <VoiceIcon width={iconWidth} height={iconHeight} />
                                    <div className="md:hidden col-span-2">Voice Correction</div>
                                </div>
                            </Link>
                        </Tooltip>
                        </div>
                    <div>
                        <Tooltip text={"Quiz"} position="right">
                            <Link href="/home"
                                onClick={() => window.location.replace("/home")}
                            >
                                <div className={`p-3 hover:bg-orange grid grid-cols-3 ${pathname === '#' ? 'bg-orange' : ''}`}>
                                    <LessonIcon width={iconWidth} height={iconHeight} />
                                    <div className="md:hidden col-span-2">Your Lessons</div>
                                </div>
                            </Link>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar