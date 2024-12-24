"use client"

import MiniHeader from "@/components/exercises/MiniHeader";
import Button from "@/components/button";
import React, {useState} from "react";
import {pushSuccess} from "@/components/Toast";
import MiniMenu from "@/components/exercises/MiniMenu";

export default function Exercises() {
    return (
        <>
            <div className={"flex flex-col min-h-screen w-2/3 justify-items-start border-l border-r border-black mx-auto"}>
                <div className={"w-full h-full"}>
                    <MiniHeader
                    type = "generatingExercise"/>
                </div>
                <div className={"w-full h-full overflow-y-auto"}>
                    <MiniMenu />
                </div>
            </div>
        </>
    )
}