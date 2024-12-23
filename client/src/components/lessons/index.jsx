"use client"

import Sidebar from "@/components/lessons/Sidebar";

export default function Lessons() {
    return (
        <>
            <div className={"flex min-h-screen"}>
                <div className={"flex-1"}>
                    <Sidebar />
                </div>
                <div className="flex-1 space-y-8 bg-white text-black overflow-y-auto">
                    <section id="lesson1" className="bg-gray-100 p-6 rounded-md shadow">
                        <h2 className="text-2xl font-bold mb-4">Lesson 1</h2>
                        <p className="">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.
                        </p>
                    </section>
                    <section id="lesson2" className="bg-gray-100 p-6 rounded-md shadow">
                        <h2 className="text-2xl font-bold mb-4">Lesson 2</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.
                        </p>
                    </section>
                    <section id="lesson3" className="bg-gray-100 p-6 rounded-md shadow">
                        <h2 className="text-2xl font-bold mb-4">Lesson 3</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.
                        </p>
                    </section>
                    <section id="lesson4" className="bg-gray-100 p-6 rounded-md shadow">
                        <h2 className="text-2xl font-bold mb-4">Lesson 4</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.
                        </p>
                    </section>
                    <section id="lesson5" className="bg-gray-100 p-6 rounded-md shadow">
                        <h2 className="text-2xl font-bold mb-4">Lesson 5</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.
                        </p>
                    </section>
                    <section id="lesson6" className="bg-gray-100 p-6 rounded-md shadow">
                        <h2 className="text-2xl font-bold mb-4">Lesson 6</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
                            lacus eu elit facilisis tempor.
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}