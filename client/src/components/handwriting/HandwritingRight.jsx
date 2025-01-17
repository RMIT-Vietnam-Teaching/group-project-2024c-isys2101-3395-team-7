"use client";
import { useState } from "react";
import Button from "../ui/Button";
import DragDropIcon from "../icons/DragDropIcon";
import { pushError, pushWarning } from "../Toast";

const HandwritingRight = ({
  state,
  handleForm,
  comments,
  rawText,
  correctText,
  isExercise
}) => {
  const errors = [];
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!isValidImageFile(file)) {
      setSelectedFile(null);
      pushError("Invalid file type!");
      pushWarning("Allowable file formats: .png, .jpeg, .jpg, .HEIC");
      return;
    }
    setSelectedFile(file);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    handleForm(selectedFile);
  };

  const isValidImageFile = (file) => {
    const acceptedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/heic",
    ];
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
          <p className="text-gray-600">
            {isExercise ? "Input your answer here!" : "Try out our wonderful service now!"}
          </p>
        </div>
      )}

      {state == "process" && (
        <>
          <div className="w-full md:h-28 grid content-center md:pb-0 pb-5">
            <h3 className="text-lg font-bold text-center">Fixed / Bản sửa</h3>
          </div>
          <span className="text-gray-700 h-full">
            {comments.length == 0
              ? "Your handwriting is perfect! No mistakes found."
              : "Mistakes found in your handwriting:"}
            {comments.map((comment, index) => (
              <div key={index}>
                <span className="font-bold">
                  Mistake {index + 1}: {comment.mistake}
                </span>
                <br />
                <span className="font-bold">
                  Description: {comment.description}
                </span>
              </div>
            ))}
            <br />

            <div>
              <span className="font-bold text-left">Correct Text:</span>
              <textarea
                className="block w-full md:h-48 p-4 border border-gray-300 rounded-lg resize-y bg-gray-100 text-black overflow-y-auto"
                value={correctText}
                placeholder="Transcript Texts From Fixed Handwriting will be displayed here."
                readOnly
              />
            </div>
          </span>
        </>
      )}
    </>
  );
};

export default HandwritingRight;
