'use client'
import { useState, useEffect } from "react";
import HandwritingGuide from "./HandwritingGuide"

const HandwritingLeft = ({ state, handleState, originalInput }) => {

    return (
        <>
            <div className="flex-1 mr-4 text-center md:border-b-0 border-b pb-5">
                {state == "begin" && <HandwritingGuide />}
                {state === "process" && (
                    <>
                        <h3 className="text-lg font-bold md:absolute top-10 right-1/3">Original / Bản gốc</h3>
                        <img src={originalInput} alt="Original Image" />
                    </>
                )}
            </div>
        </>
    )
}

export default HandwritingLeft