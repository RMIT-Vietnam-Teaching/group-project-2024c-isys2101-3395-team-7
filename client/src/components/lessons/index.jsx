"use client"

import Sidebar from "@/components/lessons/Sidebar";
import FloatingSidebar from "@/components/lessons/FloatingSidebar";
import React, {useEffect, useState} from "react";
import CircularProgress from "@/components/CircularProgress";

export default function Lessons() {
    const [isLoading, setIsLoading] = useState(true);
    // const [lessonsData, setLessonsData] = useState()

    const lessonsData = [
        {
            id: 1,
            title: 'Lesson 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.'
        },
        {
            id: 2,
            title: 'Lesson 2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis\n' +
                '                            lacus eu elit facilisis tempor.'
        },
        // ... more lessons
    ];

    useEffect(() => {
        const fetchData = async () => {
            // Replace this with actual data fetching logic
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // setLessonsData(/* Your fetched data */);
            setIsLoading(false);
        };
        fetchData();
    }, []);


    return (
        <>
            <div className={"flex min-h-screen w-2/3 content-center justify-center  mx-auto"}>
                <div className={"flex justify-items-end"}>
                    <Sidebar/>
                </div>
                <div
                    className="flex-1 justify-center items-center max-w-1/4 h-screen space-y-8 bg-white text-black overflow-y-auto">
                    {isLoading ? (
                        <div className="flex flex-col justify-center items-center h-full">
                            <CircularProgress size="lg"/>
                            <span className="text-sm mt-2">Generating Lessons...</span>
                        </div>
                    ) : (
                        <div>
                            {lessonsData.map((lesson) => (
                                <section key={lesson.id} id={lesson.id} className="bg-gray-100 p-6 rounded-md shadow">
                                <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
                                <p className="">{lesson.content}</p>
                            </section>
                        ))}
                    </div>
                    )}
                </div>
                <div className={"flex"}>
                    <FloatingSidebar/>
                </div>
            </div>
        </>
    )
}