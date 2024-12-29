"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import StarIcon from "@/components/icons/StarIcon";
import {
  recognizeHandwriting,
  correctRecognizedText,
  recordHistory,
  uploadImage,
  addFavorite,
} from "@/api";
import { pushSuccess } from "@/components/Toast";
import { extractText } from "@/components/helper/ExtractText";
import FeatureFrame from "@/components/FeatureFrame";
import Loading from "@/components/Loading";
import { useHeader } from "@/context/HeaderContext";

const Handwriting = () => {
  const [currState, setCurrState] = useState("begin");
  const [isSaved, setSave] = useState(false);
  const formData = new FormData();
  const [recognizedText, setRecognizedText] = useState("");
  const [correctText, setCorrectText] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [currentRecord, setCurrentRecord] = useState(null);
  const [comment, setComment] = useState([]);
  const { updateHeaderData } = useHeader();

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

  const handleSubmit = async (newFileUpload) => {
    try {
      var res = await handleTextScanning(newFileUpload);
      var text = extractText(res, "corrected_text");
      var cmt = extractText(res, "errors");
      if (text !== null) {
        var imageId = await handleUploadImage(newFileUpload);
        await handleRecordHistory(imageId, "handwriting", text, cmt);
        await updateHeaderData(); // fetch data again on header
      } else console.log("correctText is null");
    } catch (error) {
      console.error("Error submitting image:", error);
    }
  };

  const handleRecordHistory = async (image, type, answer, comment) => {
    console.log("handleRecordHistory");
    const formData = new FormData();
    // Change this to current username when authentication is implemented
    formData.append("username", localStorage.getItem("username"));
    formData.append("time", new Date().toISOString());
    formData.append("type", type);
    formData.append("favorite", "false");
    formData.append("imageId", image);
    formData.append("answer", answer);
    formData.append("comment", JSON.stringify(comment));

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
        setComment(extractText(resCorrect, "errors"));
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
    <div className="h-full">
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
            onClick={() => handleAddFavorite(currentRecord)}
          />
        </div>
        <div className="h-full border border-black bg-gray-100 py-4 md:mx-20 mx-8 rounded-lg grid md:grid-cols-2 relative place-items-center">
          {loading ? (
            <Loading />
          ) : (
            <FeatureFrame
              type="handwriting"
              props={{
                currState,
                setCurrState,
                imageUrl,
                handleSubmit,
                comment,
                recognizedText,
                correctText,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Handwriting;
