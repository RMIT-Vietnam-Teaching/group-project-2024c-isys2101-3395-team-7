'use client'
import { useHeader } from "@/context/HeaderContext"
import Link from "next/link";

const History = () => {
    const { historyData } = useHeader();

    return (
        <>
            <div className={`z-10 bg-orange md:w-1/5 w-1/2 md:right-6 p-2 right-0 border-white border-l-1 overflow-y-auto absolute`}>
                <nav>
                    {historyData ? (
                        <ul>
                            {historyData.length ? historyData.map((item, index) => (
                                <Link href="/activity?tab=history" key={item._id}>
                                    <li key={index}
                                        className={`p-2 cursor-pointer border border-white text-white bg-pink hover:bg-black
                    ${item.status === 'unread' ? 'notification-unread hover:bg-primary transition-colors duration-200' : 'notification-read hover:bg-grey-300 transition-colors duration-300'}`}
                                    // onClick={() => handleHistoryClick(item._id)}
                                    >
                                        <img src={'History.svg'} alt={'unstarred-history'} className={'h-8 w-8'} />
                                        {item.type} <br />
                                        {item.time}
                                    </li>
                                </Link>)) :
                                (
                                    <li className="p-4 text-white text-center">
                                        No history available
                                    </li>)}
                        </ul>
                    ) : (
                        <p className='p-2 cursor-pointer border-y border-t-white'>
                            No Favorite Item available
                        </p>
                    )}
                </nav>
            </div>
        </>
    )
}
export default History