'use client'
import React, {useState} from "react"
import Link from "next/link";

function Header () {
    const [isOpenHistory, setIsOpenHistory] = useState(false);


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
                            <button className="mx-5">
                                <img src={'Bookmark_black.svg'} alt="Favorite Icon" className={'h-10 w-10'}/>
                            </button>
                            <button className="mx-5">
                                <img src={'Setting_fill.svg'} alt="Setting Icon" className={'h-10 w-10'}/>
                            </button>
                            <button className="mx-2">
                                <img src={'User_circle.svg'} alt="User" className={'h-10 w-10'}/>
                            </button>
                        </div>
                    </div>
            </div>
        </>
)
}

export default Header