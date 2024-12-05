"use client";
import VoiceIcon from "@/components/icons/VoiceIcon";
import Button from "@/components/ui/Button";
import ReturnIcon from "@/components/icons/ReturnIcon";
import { useState } from "react";
// import { ReactMediaRecorder } from "react-media-recorder";
import dynamic from "next/dynamic";

const SpeechToTextInterface = ({ state, handleState, handleForm, correctText }) => {
    const [transcript, setTranscript] = useState('Your speech will appear here...');
    const [audioUrl, setAudioUrl] = useState(null);

    const ReactMediaRecorder = dynamic(() => import('react-media-recorder').then((mod) => mod.ReactMediaRecorder), {
        ssr: false,
    });

    const handleReset = () => {
        setTranscript('Your speech will appear here...');
        setAudioUrl(null);
    };

    const handleReturnToPreviousInterface = (event) => {
        console.log("return button clicked!");
        handleState("begin");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleForm && typeof handleForm === 'function') {
            handleForm(audioUrl);
        } else {
            console.error("handleForm is not a function");
        }
    };

    return (
        <>
            <div className="flex-col h-full w-full justify-center items-center text-center justify-items-center">
                <div className={"grid grid-cols-3 gap-4 items-center"}>
                    <div className={"flex items-center justify-center"}>
                        <VoiceIcon width={50} height={50} />
                    </div>

                    <div className={"flex items-center justify-center"}>
                        <p>Speech-To-Text Mode</p>
                    </div>
                    <div className={"flex items-center justify-center"} onClick={handleReturnToPreviousInterface}>
                        <ReturnIcon width={50} height={50} />
                    </div>
                </div>
                <div className="w-full max-h-64 h-24">
                    <textarea
                        className="block w-full p-4 border border-gray-300 rounded-lg resize-none bg-gray-100 text-black overflow-y-auto"
                        value={transcript}
                        placeholder={transcript}
                        readOnly
                    />
                </div>
                {/*TODO: buttons are not displaying*/}
                <div className={"grid grid-cols-3 items-center h-12 overflow-visible"}>
                    <div className={"flex justify-center h-12"}>
                        <ReactMediaRecorder
                            audio
                            onStop={(blobUrl, blob) => {
                                setAudioUrl((blobUrl));
                            }}
                            render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                                <div>
                                    <Button
                                        style="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange"
                                        onClick={() => handleRecord(startRecording)}
                                        text={"Start Recording"}
                                    />
                                    <Button
                                        style="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange"
                                        onClick={handleRecord(stopRecording)}
                                        text={"Stop Recording"}
                                    />
                                    <audio className="hidden" src={mediaBlobUrl} controls />
                                </div>
                            )}
                        />

                    </div>
                    <div className={"flex justify-center"}>
                        <Button
                            style="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange"
                            onClick={handleReset}
                            text={"Reset"}
                        />
                    </div>
                    <div className={"flex justify-center"}>
                        <form onSubmit={handleSubmit}>
                            <button
                                className="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange"
                                type="submit"
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SpeechToTextInterface