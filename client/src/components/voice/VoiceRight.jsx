"use client";

import DragDropIcon from "@/components/icons/DragDropIcon";
import { pushError, pushWarning } from "@/components/Toast";
import Button from "@/components/ui/Button";
import { useState } from "react";
import VoiceIcon from "@/components/icons/VoiceIcon";
import VoiceRecorder from "./VoiceRecorder";
import ReactPlayer from "react-player";
import { recognizeVoice } from "@/api";

const VoiceRight = ({
  state,
  handleState,
  handleForm,
  comments,
  rawText,
  correctedText,
  resultAudio,
  testAudio,
}) => {
  const errors = [];
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleRecord = (recordFile) => {
    setSelectedFile(recordFile);
  };

  const handleFileUpload = () => {
    handleForm(selectedFile);
  };

  const handleMicrophoneClick = (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log("Microphone button clicked!");
    // handleState("microphone");
  };

  const isPlainText = (event) => {
    event.preventDefault();
    console.log("You are clicking on a slash /");
  };

  const handleRefreshRecording = () => {
    setSelectedFile(null); // Clears the current recording, allowing a new recording to start
  };

  const [transcript, setTranscript] = useState(
    "Transcript Texts From Fixed Audio will be displayed here"
  );

  return (
    <>
      {state === "begin" && (
        <div className="md:h-full h-full grid content-center overflow-y-auto w-full">
          <form
            onSubmit={handleFileUpload}
            className="grid justify-items-center"
          >
            <label className="grid appearance-none cursor-pointer hover:border-gray-400 focus:outline-none justify-items-center w-full">
              <div className={"top-1 w-full flex gap-4 justify-center"}>
                <div>
                  <DragDropIcon width={50} height={50} />
                </div>
                <div
                  className="flex justify-center items-center cursor-default"
                  onClick={isPlainText}
                >
                  <p className={"text-4xl"}> / </p>
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
              <div
                className={
                  "flex flex-col md:flex-row items-center justify-center gap-6 my-4"
                }
              >
                {/*File upload button*/}
                <div className="h-11 py-2 px-4 my-3 rounded bg-black text-white hover:bg-orange">
                  {selectedFile ? "Choose another file" : "Browse your file"}
                </div>
                {/*"Or" Text*/}
                <div
                  className={
                    "flex flex-row gap-2 items-center justify-center w-26"
                  }
                >
                  <div className={"flex items-center justify-center"}>
                    <p
                      className="text-lg font-semibold text-gray-600 cursor-default text-center"
                      onClick={isPlainText}
                    >
                      Or
                    </p>
                  </div>
                  {/*Voice Recorder*/}
                  <div className={"flex justify-center flex-col"}>
                    <VoiceRecorder setFile={handleRecord} />
                  </div>
                </div>
              </div>
            </label>
            {selectedFile && (
              <>
                <div className={"italic"}>{selectedFile.name}</div>
                {/* Refresh button */}
                <Button
                  onClick={handleRefreshRecording}
                  text="Start New Recording"
                  style="bg-black text-white hover:bg-orange py-2 px-4 mb-3"
                />
                <Button
                  type="submit"
                  text="Submit file"
                  style="bg-black text-white hover:bg-orange py-2 px-4 mb-3"
                />
              </>
            )}
          </form>
          <p className="flex justify-center text-gray-600 text-center">
            Try out our wonderful service now!
          </p>
        </div>
      )}

      {state === "process" && (
        <div
          className={
            "h-full w-full flex flex-col justify-center items-center gap-6"
          }
        >
          <div className="w-full md:h-28 grid content-center md:pb-0 pb-5">
            <h3 className="text-lg font-bold text-center">Fixed / Bản sửa</h3>
          </div>
          <div className="overflow-y-auto md:px-8 w-full">
            {/*===================AI AUDIO====================*/}
            <div className="mb-5">
              <span className="font-bold">
                Corrected Audio Version In AI Voice:{" "}
              </span>
              <br />
              {/* replace with the responded audio from api */}
              <ReactPlayer
                className="w-full"
                url={resultAudio || testAudio}
                controls
                width="100%"
                height="50px"
              />
            </div>
            {/*=======TRANSCRIPT TEXT FROM AI AUDIO HERE:==========*/}
            {/*============ERROR DETAILED DESCRIPTION HERE==============*/}
            <span className="text-gray-700">
              {comments.length == 0
                ? "Your audio is perfect! No mistakes found."
                : "Mistakes found in your audio:"}
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
                <span className="font-bold text-left">
                  Correct Text:
                </span>
                <textarea
                  className="block w-full p-4 border border-gray-300 rounded-lg resize-y bg-gray-100 text-black overflow-y-auto"
                  value={correctedText}
                  placeholder="Transcript Texts From Fixed Audio will be displayed here."
                  readOnly
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceRight;
