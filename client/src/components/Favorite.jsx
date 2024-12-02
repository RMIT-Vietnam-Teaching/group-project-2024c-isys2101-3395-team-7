'use client'
import React, { useContext } from 'react'
// import {HistoryContext} from "@/components/HistoryContext";

// TODO: adjust this after done with history, untick on favorite item

export default function Favorite() {
    // get history data, markAsFavorite function, and open state from HistoryContext
    // const {history, markAsFavorite, open} = useContext(HistoryContext);
    //
    // const handleHistoryClick = async (historyId) => {
    //     // mark the history as read when clicked
    //     await markAsFavorite(historyId);
    // };

    return (<>
        <div className={`z-10 bg-pink h-2/3 md:w-1/5 w-1/2 pb-[50px] right-6 border-white border-l-1 overflow-y-auto absolute`}
        // style={{display: open ? '' : 'none'}}
        >
            <nav>
                <ul>
                    <li className='p-2 cursor-pointer border-y border-t-white'>
                        No Favorite Item available
                    </li>
                    {/*render history if any exists*/}
                    {/*{history.length ? history.map((h) => (*/}
                    {/*    <li key={h._id}*/}
                    {/*        // className={`p-2 cursor-pointer border-b border-white text-white*/}
                    {/*        // ${h.status === 'unread' ? 'notification-unread hover:bg-primary transition-colors duration-200' : 'notification-read hover:bg-grey-300 transition-colors duration-300'}*/}
                    {/*        // `}*/}
                    {/*        className={`p-2 cursor-pointer border-b border-white text-white */}
                    {/*        `}*/}
                    {/*        onClick={() => handleHistoryClick(h._id)}*/}
                    {/*    >*/}
                    {/*        <img src={'Bookmark.svg'} alt={'unstarred-history'} className={'h-16 w-16'} />*/}
                    {/*    </li>*/}
                    {/*)) : (*/}
                    {/*    <li className="p-4 text-white text-center">*/}
                    {/*        No history available*/}
                    {/*    </li>*/}
                    {/*)}*/}
                </ul>
            </nav>
        </div>
    </>)
}