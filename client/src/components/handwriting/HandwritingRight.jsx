"use client";
import { useState } from "react";
import Button from "../ui/Button";
import DragDropIcon from "../icons/DragDropIcon";
import { pushError, pushWarning } from "../Toast";

const HandwritingRight = ({ state, handleState, handleForm, correctText }) => {
  const errors = [];
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!isValidImageFile(file)) {
      setSelectedFile(null)
      pushError("Invalid file type!");
      pushWarning("Allowable file formats: .png, .jpeg, .jpg, .HEIC")
      return;
    }
    setSelectedFile(file);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    handleForm(selectedFile);
  };

  const isValidImageFile = (file) => {
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/heic"];
    return acceptedImageTypes.includes(file.type);
  };

  return (
    <>
      {state == "begin" && (
        <div className="md:h-full h-2/3 grid content-center">
          <form
            onSubmit={handleFileUpload}
            className="grid justify-items-center"
          >
            <label className="grid appearance-none cursor-pointer hover:border-gray-400 focus:outline-none justify-items-center">
              <div className={"justify-center"}>
                <DragDropIcon width={50} height={50} />
              </div>
              <div>{selectedFile?.name}</div>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="hidden"
              />
              <pushError message={"Invalid file type!"} />
              <div className="py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange">
                {selectedFile ? "Choose another file" : "Browse your file"}
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
          <p className="text-gray-600">Try out our wonderful service now!</p>
        </div>
      )}

      {state == "process" && (
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
              {errors.length == 0 && (<span className="text-red-500"> None</span>)}
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
    </>
  );
};

export default HandwritingRight;
