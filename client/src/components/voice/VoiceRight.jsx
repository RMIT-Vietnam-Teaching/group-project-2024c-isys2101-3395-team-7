"use client";

import DragDropIcon from "@/components/icons/DragDropIcon";
import { pushError, pushWarning } from "@/components/Toast";
import Button from "@/components/ui/Button";
import { useState } from "react";
import VoiceIcon from "@/components/icons/VoiceIcon";
import SpeechToTextInterface from "@/components/voice/SpeechToTextInterface";
import { ReactMediaRecorder } from "react-media-recorder";

const VoiceRight = ({ state, handleState, handleForm, correctText }) => {
    const errors = [];
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleRecord = async (e, recordFunction) => {
        e.preventDefault();
        await recordFunction();
    }

    const handleFileUpload = async (event) => {
        event.preventDefault();
        handleForm(selectedFile);
    };

    const handleMicrophoneClick = (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log("Microphone button clicked!");
        // handleState("microphone");
    }

    return (
        <>
            {state === "begin" && (
                <div className="md:h-full h-2/3 grid content-center">
                    <form
                        onSubmit={handleFileUpload}
                        className="grid justify-items-center"
                    >
                        <label
                            className="grid appearance-none cursor-pointer hover:border-gray-400 focus:outline-none justify-items-center">
                            <div className={"flex gap-4 justify-center"}>
                                <div>
                                    <DragDropIcon width={50} height={50} />
                                </div>
                                <div>
                                    <p> / </p>
                                </div>
                                <div onClick={handleMicrophoneClick}>
                                    <VoiceIcon width={50} height={50} />
                                </div>
                            </div>
                            <div>{selectedFile?.name}</div>
                            <input
                                type="file"
                                name="audio"
                                accept="audio/*"
                                onChange={(e) => handleFileInput(e)}
                                className="hidden"
                            />
                            <div className={"flex gap-4 justify-center"}>
                                <div className="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange">
                                    {selectedFile ? "Choose another file" : "Browse your file"}
                                </div>
                                <p>Or</p>
                                <div
                                    onClick={handleMicrophoneClick}
                                    className="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange">
                                    Start Recording
                                </div>
                                <ReactMediaRecorder
                                    audio
                                    onStop={(blobUrl, blob) => {
                                        setSelectedFile(blobUrl);
                                    }}
                                    render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                                        <div>
                                            <Button
                                                style="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange"
                                                onClick={(e) => handleRecord(e, startRecording)}
                                                text={"Start Recording"}
                                            />
                                            <Button
                                                style="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange"
                                                onClick={(e) => handleRecord(e, stopRecording)}
                                                text={"Stop Recording"}
                                            />
                                            <audio className="hidden" src={mediaBlobUrl} controls />
                                        </div>
                                    )}
                                />
                            </div>
                        </label>
                        {selectedFile && (
                            <Button
                                type="submit"
                                text="Submit file"
                                style="bg-black text-white hover:bg-orange py-2 px-4 mb-3"
                            />
                        )}
                    </form>
                    <p className="flex justify-center text-gray-600">Try out our wonderful service now!</p>
                </div>
            )}

            {state === "process" && (
                <>
                    <div className="w-full md:h-28 grid content-center md:pb-0 pb-5">
                        <h3 className="text-lg font-bold text-center">Fixed / Bản sửa</h3>
                    </div>
                    <div className="overflow-y-auto md:px-8">
                        <p className="text-gray-700 mb-10 leading-loose">
                            {correctText || "No text available"}
                        </p>
                        <p className="text-gray-700">
                            Total Errors: {correctText.errors || "0"}. Errors:
                            {errors.length == 0 && (
                                <span className="text-red-500"> None</span>
                            )}
                        </p>
                        <ul className="list-disc list-inside ml-4">
                            {errors?.map((error, index) => (
                                <li key={index} className="text-red-500">
                                    {error || "Detected Error"}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-lg block mt-3">{correctText.comment || ""}</p>
                </>
            )}

            {/*TODO: Speech-to-text mode couldn't appear alongside VoiceLeft*/}
            {/* {state === "microphone" && (
                <SpeechToTextInterface
                    handleState={handleState}
                    handleForm={handleFileRecord}
                />
            )} */}
        </>
    )
}

export default VoiceRight