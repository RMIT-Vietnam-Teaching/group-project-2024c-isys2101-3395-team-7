"use client"

import VoiceIcon from "@/components/icons/VoiceIcon";
import Button from "@/components/ui/Button";
import ReturnIcon from "@/components/icons/ReturnIcon";
import {useState} from "react";

const SpeechToTextInterface = ({state, handleState, handleForm, correctText}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('Your speech will appear here...');

    const handleStartStopRecording = () => {
        setIsRecording(!isRecording);
        // Implement speech-to-text logic here, e.g., using a library like `react-speech-recognition`
    };

    const handleReset = () => {
        setTranscript('Your speech will appear here...');
    };

    const handleReturnToPreviousInterface = (event) => {
        console.log("return button clicked!");
        handleState("begin");
    }
    return (
        <>
            <div className="flex-col h-full w-full justify-center items-center text-center justify-items-center">
                <div className={"grid grid-cols-3 gap-4 items-center"}>
                    <div className={"flex items-center justify-center"}>
                        <VoiceIcon width={50} height={50}/>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <p>Speech-To-Text Mode</p>
                    </div>
                    <div className={"flex items-center justify-center"} onClick={handleReturnToPreviousInterface}>
                        <ReturnIcon width={50} height={50}/>
                    </div>
                </div>
                {/*TODO: text area's height should be longer*/}
                <div className="w-full max-h-64 h-24">
                    <textarea
                        className=" block w-full p-4 border border-gray-300 rounded-lg resize-none bg-gray-100 text-black overflow-y-auto"
                        value={transcript}
                        placeholder={transcript}
                        readOnly
                    />
                </div>
                {/*TODO: buttons are not displaying*/}
                <div className={"grid grid-cols-3 items-center h-12 overflow-visible"}>
                    <div className={"flex justify-center h-12"}>
                        <Button
                            className="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange"
                            onClick={handleStartStopRecording}
                        >
                            {isRecording ? "Resume Recording" : "Stop Recording"}
                        </Button>
                    </div>
                    <div className={"flex justify-center"}>
                        <Button
                            className="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange"
                        onClick={handleReset}>
                            Reset
                        </Button>
                    </div>
                    <div className={"flex justify-center"}>
                        <Button
                            className="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpeechToTextInterface