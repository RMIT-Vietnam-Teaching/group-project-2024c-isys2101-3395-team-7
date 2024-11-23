'use client'
import { useState } from "react";
import Button from "../ui/Button";
import DragDropIcon from "../icons/DragDropIcon";

const HandwritingRight = ({ state, handleState, handleForm }) => {
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
                            className="appearance-none cursor-pointer hover:border-gray-400 focus:outline-none justify-items-center">
                            <DragDropIcon width={50} height={50} />
                            <input type="file" name="image" onChange={handleFileChange} className="hidden" />
                            <div className="py-2 px-4 mb-3 rounded bg-black text-white hover:bg-orange">Browse your file</div>
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
                    <div className="mb-5">
                        <h3 className="text-lg font-bold">Fixed / Bản sửa</h3>
                        <p className="text-gray-700">{"No text available"}</p>
                    </div>
                    <div className="flex items-center my-10">
                        <p className="text-gray-700">Sửa: {"0"} từ, lỗi:</p>
                        <ul className="list-disc list-inside ml-4">
                            {errors?.map((error, index) => (
                                <li key={index} className="text-red-500">{error}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </>
    )
}

export default HandwritingRight