'use client'
import { useState } from "react";
import Button from "../ui/Button";
import DragDropIcon from "../icons/DragDropIcon";

const HandwritingRight = ({ state, handleState, handleForm, correctText }) => {
    const errors = [];
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0].name); // Check if the file object is logged
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();
        handleForm(selectedFile);
    };

    return (
        <>
            {state == "begin" && (
                <>
                    <form onSubmit={handleFileUpload} className="grid justify-items-center">
                        <label
                            className="grid appearance-none cursor-pointer hover:border-gray-400 focus:outline-none justify-items-center">
                            <div className={'justify-center'}>
                                <DragDropIcon width={50} height={50} />
                            </div>
                            <div>{selectedFile?.name}</div>
                            <input type="file" name="image" onChange={handleFileChange} className="hidden" />
                            <div className="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange">{selectedFile ? "Choose another file" : "Browse your file"}</div>
                        </label>
                        {selectedFile && <Button type="submit" text="Submit file" style="bg-black text-white hover:bg-orange py-2 px-4 mb-3" />}
                    </form>
                    <p className="text-gray-600">
                        Try out our wonderful service now!
                    </p>
                </>
            )}

            {state == "process" && (
                <>
                    <div className="mb-5 w-full">
                        <h3 className="text-lg font-bold text-center mb-3 md:absolute top-10 right-1/3">Fixed / Bản sửa</h3>
                        <p className="text-gray-700">{correctText.text || "No text available"}</p>
                    </div>
                    <div className="flex items-center mt-10">
                        <p className="text-gray-700">Total Errors: {correctText.errors || "0"}, Errors:</p>
                        <ul className="list-disc list-inside ml-4">
                            {errors?.map((error, index) => (
                                <li key={index} className="text-red-500">{error || "Detected Error"}</li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-lg block mt-3">{correctText.comment || ""}</p>
                </>
            )}
        </>
    )
}

export default HandwritingRight