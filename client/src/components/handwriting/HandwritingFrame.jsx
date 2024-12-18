"use client";
import { useState, useEffect } from "react";
import HandwritingLeft from "./HandwritingLeft";
import HandwritingRight from "./HandwritingRight";
import Button from "../ui/Button";
import StarIcon from "../icons/StarIcon";
import {
  recognizeHandwriting,
  correctRecognizedText,
  recordHistory,
  uploadImage,
  addFavorite,
} from "@/api";
import CircularProgress from "@/components/CircularProgress";
import { pushSuccess } from "../Toast";
import { extractText } from "../hubber/ExtractText";
import Tooltip from "@/components/tooltip";

function HandwritingFrame({}) {
  const [currState, setCurrState] = useState("begin");
  const [isSaved, setSave] = useState(false);
  const formData = new FormData();
  const [recognizedText, setRecognizedText] = useState("");
  const [correctText, setCorrectText] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [currentRecord, setCurrentRecord] = useState(null);
  const [comments, setComments] = useState([]);

  const handleFileChange = (file) => {
    // console.log('receive file', file)
    if (file instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitImage = async (newFileUpload) => {
    try {
      var text = await handleTextScanning(newFileUpload);
      if (text !== null) {
        var imageId = await handleUploadImage(newFileUpload);
        await handleRecordHistory(imageId, "handwriting", text);
      } else console.log("correctText is null");
    } catch (error) {
      console.error("Error submitting image:", error);
    }
  };

  const handleRecordHistory = async (image, type, answer) => {
    console.log("handleRecordHistory");
    const formData = new FormData();
    // Change this to current username when authentication is implemented
    formData.append("username", "test");
    formData.append("time", new Date().toISOString());
    formData.append("type", type);
    formData.append("favorite", "false");
    formData.append("imageId", image);
    formData.append("answer", answer);

    try {
      const res = await recordHistory(formData);
      console.log("API response:", res);
      setCurrentRecord(res.newRecord._id);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleUploadImage = async (newFileUpload) => {
    console.log("handleUploadImage", newFileUpload);
    try {
      const res = await uploadImage(newFileUpload);
      console.log("API response:", res);
      return res.imageId;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleTextScanning = async (newFileUpload) => {
    console.log("handleTextScanning", newFileUpload);
    formData.append("image", newFileUpload);
    handleFileChange(formData.getAll("image")[0]);
    setLoading(true); // Set loading to true before API requests
    pushSuccess("Successfully submitted!");
    try {
      const resTextRecognize = await recognizeHandwriting(formData);
      console.log("API response:", resTextRecognize);
      if (resTextRecognize) {
        // Assuming success check
        setRecognizedText(resTextRecognize);
        console.log("has response");
        const resCorrect = await correctRecognizedText(resTextRecognize);
        setComments(extractText(resCorrect, "errors"));
        if (resCorrect) {
          const correctedText = extractText(resCorrect, "corrected_text");
          // after get correct text
          setCorrectText(correctedText);
          setCurrState("process");
          return resCorrect;
        }
      }
      return null;
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async (imageId) => {
    const formData = new FormData();
    !isSaved
      ? formData.append("favorite", "true")
      : formData.append("favorite", "false");
    try {
      const res = await addFavorite(formData, imageId);
      console.log("API response:", res);
    } catch (error) {
      console.error("Error adding favorite:", error);
    } finally {
      setSave(!isSaved);
    }
  };

  return (
    <div className="h-5/6 my-10">
      <div className="flex justify-between">
        <Tooltip text={"Click Here To Upload a New Photo!"} position={"right"}>
          <Button
              text="Upload a new one"
              onClick={() => {
                setCurrState("begin");
                window.location.reload();
              }}
              style="bg-pink md:py-2 p-2 md:text-base text-sm md:ml-20 ml-8 hover:bg-orange"
          />
        </Tooltip>
        <Tooltip text={"Click Here To Add This Answer To Favorite!"} position={"left"}>
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
              onClick={() => handleAddFavorite(currentRecord)}
          />
        </Tooltip>
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
              <HandwritingLeft
                state={currState}
                handleState={setCurrState}
                originalInput={imageUrl}
              />
            </div>
            <div className="absolute border-l border-gray-300 py-8 h-3/4 md:block hidden" />
            <div className="flex flex-col items-center relative h-full w-full px-8 min-h-60 overflow-y-auto">
              {/* content */}
              <HandwritingRight
                state={currState}
                handleState={setCurrState}
                handleForm={handleSubmitImage}
                comments={comments}
                rawText={recognizedText}
                correctText={correctText}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HandwritingFrame;
