"use client";

import Button from "@/components/ui/Button";
import StarIcon from "@/components/icons/StarIcon";
import CircularProgress from "@/components/CircularProgress";
import { useState } from "react";
import {
  correctRecognizedTextVoice,
  recognizeVoice,
  recordHistory,
  uploadAudio,
  createAiVoice,
} from "@/api";
import { pushSuccess } from "@/components/Toast";
import VoiceLeft from "@/components/voice/VoiceLeft";
import VoiceRight from "@/components/voice/VoiceRight";

const VoiceFrame = ({}) => {
  const [currState, setCurrState] = useState("begin");
  const [isSaved, setSave] = useState(false);
  const formData = new FormData();
  const [recognizedText, setRecognizedText] = useState("");
  const [correctText, setCorrectText] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [resultAudio, setResultAudio] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [comments, setComments] = useState([]);

  const handleFileChange = (file) => {
    console.log("receive file", file);
    if (file instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAudioUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function extractText(response, content) {
    // Step 1: Get the `result` string and remove triple backticks
    const rawResult = response.result;
    const jsonString = rawResult
      .replace(/```json\n|```/g, "")
      .split("\n\n")[0]
      .trim();

    // Step 2: Parse the JSON string
    try {
      const parsedData = JSON.parse(jsonString);
      switch (content) {
        case "corrected_text":
          return parsedData.corrected_text;
        case "errors":
          return parsedData.errors;
        default:
          return null;
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }

  const handleSubmitFile = async (newFileUpload) => {
    try {
      var text = await handleVoiceRecognize(newFileUpload);
      if (text !== null) {
        var audioId = await handleUploadFile(newFileUpload);
        await handleRecordHistory(audioId, "saving audio", text);
      } else console.log("correctText is null");
    } catch (error) {
      console.error("Error submitting file:", error);
    }
  };

  const handleRecordHistory = async (audio, type, answer) => {
    console.log("handleRecordHistory");
    const formData = new FormData();
    // Change this to current username when authentication is implemented
    formData.append("username", "test");
    formData.append("time", new Date().toISOString());
    formData.append("type", type);
    formData.append("favorite", "false");
    formData.append("audio_id", audio);
    formData.append("answer", answer);

    try {
      const res = await recordHistory(formData);
      console.log("API response:", res);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    return;
  };

  const handleUploadFile = async (newFileUpload) => {
    console.log("handleUploadFile", newFileUpload);
    try {
      const res = await uploadAudio(newFileUpload);
      console.log("API response:", res);
      return res.audioId;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleVoiceRecognize = async (newFileUpload) => {
    console.log("handleVoiceRecognize", newFileUpload);
    formData.append("audio", newFileUpload);
    handleFileChange(formData.getAll("file")[0]);
    setLoading(true); // Set loading to true before API requests
    pushSuccess("Successfully submitted!");
    try {
      const resTextRecognize = await recognizeVoice(formData);
      console.log("API response:", resTextRecognize);
      if (resTextRecognize) {
        // Assuming success check
        setRecognizedText(resTextRecognize.text);
        console.log("has response");
        const resCorrect = await correctRecognizedTextVoice(resTextRecognize);
        console.log("response text", resCorrect);
        setComments(extractText(resCorrect, "errors"));
        if (resCorrect) {
          const correctedText = extractText(resCorrect, "corrected_text");
          // after get correct text
          setCorrectText(correctedText);
          // send correct text for ai voice reading
          const resAudio = await createAiVoice(correctedText);
          if (resAudio) {
            setResultAudio(resAudio);
            setCurrState("process");
            return correctedText;
          }
        }
      }
      //   return null;
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-5/6 my-10">
      <div className="flex justify-between">
        <Button
          text="Upload a new one"
          onClick={() => {
            setCurrState("begin");
            window.location.reload();
          }}
          style="bg-pink md:py-2 p-2 md:text-base text-sm md:ml-20 ml-8 hover:bg-orange"
        />
        <Button
          text={
            <span className="inline-flex place-items-center">
              <StarIcon isFilled={isSaved} style={{ marginRight: "5px" }} />
              {"Star this answer"}
            </span>
          }
          style={`mr-20 md:py-2 px-4 rounded inline md:text-base text-sm  ${
            currState != "process" && "hidden"
          }`}
          onClick={() => setSave(!isSaved)}
        />
      </div>

      <div className="h-full border border-black bg-gray-100 py-4 md:mx-20 mx-8 rounded-lg grid md:grid-cols-2 relative place-items-center">
        {loading ? (
          <div className="col-span-2 flex flex-col items-center justify-center">
            <h4 className="text-lg font-bold mt-8 mb-4">
              We have received your request!
            </h4>
            <div className="space-y-4" style={{ maxWidth: "300px" }}>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <CircularProgress size="lg" />
                  <span className="text-sm mt-2">Please wait a bit...</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-between relative h-full w-full items-center px-4 overflow-y-auto">
              {/* content */}
              <VoiceLeft
                state={currState}
                handleState={setCurrState}
                originalInput={audioUrl}
                rawText={recognizedText}
              />
            </div>
            <div className="absolute border-l border-gray-300 py-8 h-3/4 md:block hidden" />

            <div className="flex flex-col items-center relative h-full w-full px-8 min-h-60 overflow-y-auto">
              {/* content */}
              {currState === "microphone" ? (
                <SpeechToTextInterface
                  state={currState}
                  handleState={setCurrState}
                  correctText={correctText}
                />
              ) : (
                <VoiceRight
                  state={currState}
                  handleState={setCurrState}
                  handleForm={handleSubmitFile}
                  comments={comments}
                  rawText={recognizedText}
                  correctedText={correctText}
                  resultAudio={resultAudio} // replace with resultAudio after handle api response
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceFrame;
