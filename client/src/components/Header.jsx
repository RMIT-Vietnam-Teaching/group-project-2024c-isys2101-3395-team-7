'use client'
import React, {useState} from "react"
import Link from "next/link";
import Favorite from "@/components/Favorite";

function Header () {
    const [isOpenHistory, setIsOpenHistory] = useState(false);
    const [isOpenFavorite, setIsOpenFavorite] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [isOpenSetting, setIsOpenSetting] = useState(false);


    // TODO: fix history toggle open bug and favorite toggle
    return (
        <>
            <div className='bg-pink text-center h-18 border-b-1 border-white flex flex-row items-center justify-center m-0 p-0'>
                {/*menu icon*/}
                <div className='basis-1/3 items-center justify-center h-full pl-7'>
                    <img src={'Menu.svg'} alt={'Menu'} className={'h-10 w-10'}/>
                </div>

                {/*app logo*/}
                <div className='basis-1/3 flex items-center justify-center '>
                    <Link href="/home">
                        <img src={'vietgo_logo.svg'} alt={'vietgo-logo'} className={'h-16 w-16'} />
                    </Link>
                </div>
                {/*right panel*/}
                    <div className='basis-1/3 h-full'>
                        <div className='flex items-center justify-end pr-5 mx-2 h-full'>
                            <button
                                onClick={() => setIsOpenHistory(!isOpenHistory)}
                                className={`hover:bg-orange mx-5`}>
                                <img src={'History.svg'} alt="History Icon" className={'h-10 w-10'}/>
                            </button>
                            {/* Conditionally render History */}
                            {isOpenHistory && <History />}
                            <button
                                onClick={() => setIsOpenFavorite(!isOpenFavorite)}
                                className="mx-5">
                                <img src={'Bookmark_black.svg'} alt="Favorite Icon" className={'h-10 w-10'}/>
                            </button>
                            {/* Conditionally render Favorite */}
                            {isOpenFavorite && <Favorite />}
                            <button
                                onClick={() => setIsOpenSetting(!isOpenSetting)}
                                className="mx-5">
                                <img src={'Setting_fill.svg'} alt="Setting Icon" className={'h-10 w-10'}/>
                            </button>
                            {/*Drop down to show current setting*/}
                            {isOpenSetting && (
                                <div
                                    className="absolute top-12 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200"
                                >
                                    <ul className="py-1">
                                        <li>
                                            consideration for toggl switch to change language
                                        </li>
                                        <li>
                                            consideration for voice speed
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <button
                                onClick={() => setIsOpenProfile(!isOpenProfile)}
                                className="mx-2">
                                <img src={'User_circle.svg'} alt="User" className={'h-10 w-10'}/>
                            </button>
                            {/* Dropdown Menu */}
                            {isOpenProfile && (
                                <div
                                    className="absolute top-12 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200"
                                >
                                    <ul className="py-1">
                                        <li>
                                            <button
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                                onClick={() => console.log("Profile Clicked")}
                                            >
                                                View Profile
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                                                onClick={() => console.log("Logout Clicked")}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
            </div>
        </>
)
}

export default Header