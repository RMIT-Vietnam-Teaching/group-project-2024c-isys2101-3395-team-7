"use client";

import Sidebar from "@/components/lessons/Sidebar";
import FloatingSidebar from "@/components/lessons/FloatingSidebar";
import React, { useEffect, useState } from "react";
import CircularProgress from "@/components/CircularProgress";
import { getLessons } from "@/api";

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

  return (
    <>
      <div
        className={
          "flex min-h-screen w-full content-center justify-center mx-auto"
        }
      >
        <div className={"flex justify-items-end"}>
          <Sidebar lessonsData={lessonsData} />
        </div>
        <div className="flex-1 justify-center items-center max-w-1/4 h-screen space-y-8 bg-white text-black overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-full">
              <CircularProgress size="lg" />
              <span className="text-sm mt-2">Generating Lessons...</span>
            </div>
          ) : (
            <div>
              {lessonsData.map((lesson) => (
                <section
                  key={lesson.id}
                  id={lesson.id}
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
          <FloatingSidebar />
        </div>
      </div>
    </>
  );
}
