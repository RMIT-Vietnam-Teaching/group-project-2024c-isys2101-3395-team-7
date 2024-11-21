'use client'
import React, {useState} from "react"
import Link from "next/link";

const Header = () => {

    const height = 40;
    const width = 40;

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className='bg-pink text-center h-[64px] border-b-1 border-white flex items-center justify-center'>
                {/*menu icon*/}
                <div className='flex-1'>
                    <img src={'Menu.svg'} alt={'Menu'} className={'h-6 w-6'} />
                </div>

                {/*app logo*/}
                <div className='flex-1'>
                    <Link href="/home">
                        <img src={'vietgo_logo.svg'} alt={'vietgo-logo'} className={'h-6 w-6'} />
                    </Link>
                </div>
                {/*right panel*/}
                    <div className='flex-none'>
                        <div className='flex'>
                            <button className='flex-1'>
                                <img src={'Bookmark_black.svg'} alt="Favorite Icon" className="h-6 w-6"/>
                            </button>
                            <button className='flex-1'>
                                <img src={'History.svg'} alt="History Icon" className="h-6 w-6"/>
                            </button>
                            <button className='flex-1'>
                                <img src={'Setting_fill.svg'} alt="Setting Icon" className="h-6 w-6"/>
                            </button>
                            <button className='flex-1'>
                                <img src={'User_circle.svg'} alt="User" className="h-10 w-10"/>
                            </button>
                        </div>
                    </div>
            </div>
        </>
)
}

export default Header