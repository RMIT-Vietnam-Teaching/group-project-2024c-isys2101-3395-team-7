"use client"

import {useEffect, useState} from "react";

const Sidebar = () => {
    const lessonsData = [
        {
            id: 1,
            title: 'Lesson 1',
            content: 'Lorem ipsum dolor sit amet...'
        },
        {
            id: 2,
            title: 'Lesson 2',
            content: 'Another lesson content...'
        },
        // ... more lessons
    ];

    const [clickedHeading, setClickedHeading] = useState("");

    const handleHeadingClick = (heading) => {
        setClickedHeading(heading);
    };
    return (
        <>
            <div className="w-64 bg-black text-white h-screen pt-10 flex flex-col">
                {/*<ul className="space-y-4 border-t w-full border-white h-auto">*/}
                {/*    {data.headings.map((heading, index) => (*/}
                {/*        <li key={index}>*/}
                {/*            <a*/}
                {/*                onClick={() => handleHeadingClick(heading)}*/}
                {/*                href={`#${heading.toLowerCase().replace(/\s+/g, "")}`} // Create an ID-friendly href*/}
                {/*                className={`block flex-col place-self-center items-center place-content-center content-center hover:underline hover:border-white hover:text-orange pt-0 pl-6 border-gray-800 border-b h-6 ${*/}
                {/*                    clickedHeading === heading ? "italic underline" : ""*/}
                {/*                }`}*/}
                {/*            >*/}
                {/*                {heading}*/}
                {/*            </a>*/}
                {/*        </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}

                <ul className="space-y-4 border-t w-full border-white h-auto">
                    {lessonsData.map((lesson, index) => (
                        <li key={index}>
                            <a
                                onClick={() => handleHeadingClick(lesson.title)} // Use lesson title for click handler
                                href={`#${lesson.id}`} // Create an ID-friendly href
                                className={`block flex-col place-self-center items-center place-content-center content-center hover:underline hover:border-white hover:text-orange pt-0 pl-6 border-gray-800 border-b h-6 ${
                                    clickedHeading === lesson.title ? "italic underline" : ""
                                }`}
                            >
                                {lesson.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Sidebar