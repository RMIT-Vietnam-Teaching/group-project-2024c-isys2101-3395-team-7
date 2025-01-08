"use client";

import React, { useEffect, useState } from "react";
import CircularProgress from "@/components/CircularProgress";

const Sidebar = ({ lessonsData }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [clickedHeading, setClickedHeading] = useState("");

  const handleHeadingClick = (heading) => {
    setClickedHeading(heading);
  };

  useEffect(() => {
    console.log("Lessons data:", lessonsData);
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
      <div className="md:w-64 bg-black text-white h-screen pt-10 flex flex-col">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-full">
            <CircularProgress size="lg" />
            <span className="text-sm mt-2">Generating Lessons...</span>
          </div>
        ) : (
          <ul className="space-y-4 border-t w-full border-white h-auto">
            {lessonsData.map((lesson, index) => (
              <li key={index}>
                <a
                  onClick={() => handleHeadingClick(lesson.title)} // Use lesson title for click handler
                  href={`#${lesson.id}`} // Create an ID-friendly href
                  className={`block flex-col place-self-center items-center place-content-center content-center hover:underline hover:border-white hover:text-orange pt-0 md:pl-6 border-gray-800 border-b h-6 ${
                    clickedHeading === lesson.title ? "italic underline" : ""
                  }`}
                >
                  {lesson.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
