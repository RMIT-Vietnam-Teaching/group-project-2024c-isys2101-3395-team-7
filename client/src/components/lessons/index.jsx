"use client";

import Sidebar from "@/components/lessons/Sidebar";
import FloatingSidebar from "@/components/lessons/FloatingSidebar";
import React, { useEffect, useState } from "react";
import CircularProgress from "@/components/CircularProgress";
import { getLessons } from "@/api";
import Tooltip from "@/components/tooltip";

export default function Lessons() {
  const [isLoading, setIsLoading] = useState(true);
  const [lessonsData, setLessonsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Replace this with actual data fetching logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await getLessons();
      setLessonsData(response);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility on mobile

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <>
        <div className="md:hidden fixed top-1/3 right-4 z-50 transform -translate-y-1/2 ring-white">
          <button
              onClick={toggleSidebar}
              className="text-white p-2 bg-black rounded-full"
          >
            {isSidebarOpen ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="white"
                      d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="white"
                      d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
            )}
          </button>
        </div>
        <div
            className={
              "flex min-h-screen w-full content-center justify-center mx-auto"
            }
        >
          <div className={`flex justify-items-end max-w-1/4 transition-all ${isSidebarOpen ? "block" : "hidden"} md:block sm:hidden`}>
            <Sidebar lessonsData={lessonsData}/>
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
                      <section
                          key={lesson._id}
                          id={lesson._id}
                          className="bg-gray-100 p-6 rounded-md shadow"
                      >
                        <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
                        <p className="">{lesson.content}</p>
                        <p className="">
                          <b>Example: </b> {lesson.example}
                        </p>
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
  );
}
