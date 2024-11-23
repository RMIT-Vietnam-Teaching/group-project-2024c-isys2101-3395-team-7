'use client'
import { useState } from "react";
import HandwritingLeft from "./HandwritingLeft";
import HandwritingRight from "./HandwritingRight";
import Button from "../ui/Button"
import StarIcon from "../icons/StarIcon";
import { recognizeHandwriting } from "@/api";

function HandwritingFrame({ }) {
    const [currState, setCurrState] = useState("begin");
    const [isSaved, setSave] = useState(false);
    const formData = new FormData();
    const [recognizedText, setRecognizedText] = useState("");

    const handleTextScanning = async (newFileUpload) => {
        formData.append('file', newFileUpload)
        console.log(formData.getAll('file')[0].name)

        try {
            const res = await recognizeHandwriting(formData);
            console.log('API response:', res);
            if (res.status === 'success' || res.text) { // Assuming success check
                setCurrState("process");
                setRecognizedText(res.text)
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    return (
        <div>
            <Button text="Upload a new one" onClick={() => setCurrState("begin")} style="bg-pink px-4 py-2" />
            <Button text={
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <StarIcon isFilled={isSaved} style={{ marginRight: '5px' }} />
                    {'Star this answer'}
                </span>
            }
                style="py-2 px-4 rounded inline"
                onClick={() => setSave(!isSaved)}
            />

            <div className="border border-[#4A4947] bg-gray-100 p-4 mx-20 rounded-lg grid grid-cols-2 relative place-items-center">
                <div className="flex justify-between items-center">
                    {/* content */}
                    <HandwritingLeft state={currState} handleState={setCurrState} originalText={recognizedText} />
                </div>
                <span className="absolute border-l border-gray-300 py-8 h-3/4"></span>

                <div className="items-center mt-4 grid grid-cols-1">
                    {/* content */}
                    <HandwritingRight state={currState} handleState={setCurrState} handleForm={handleTextScanning} />
                </div>
            </div>
        </div>
    );
}

export default HandwritingFrame