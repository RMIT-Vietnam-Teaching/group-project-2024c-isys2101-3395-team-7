"use client";
import { useState, useEffect } from "react";
import HandwritingLeft from "./HandwritingLeft";
import HandwritingRight from "./HandwritingRight";
import Button from "../ui/Button";
import StarIcon from "../icons/StarIcon";
import { recognizeHandwriting, correctRecognizedText } from "@/api";
import CircularProgress from "@/components/CircularProgress";

function HandwritingFrame({}) {
  const [currState, setCurrState] = useState("begin");
  const [isSaved, setSave] = useState(false);
  const formData = new FormData();
  const [recognizedText, setRecognizedText] = useState("");
  const [correctText, setCorrectText] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading status

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

  const handleTextScanning = async (newFileUpload) => {
    console.log("handleTextScanning", newFileUpload);
    formData.append("image", newFileUpload);
    handleFileChange(formData.getAll("image")[0]);
    setLoading(true); // Set loading to true before API requests
    try {
      const resTextRecognize = await recognizeHandwriting(formData);
      console.log("API response:", resTextRecognize);
      if (resTextRecognize) {
        // Assuming success check
        setRecognizedText(resTextRecognize);
        console.log("has response");
        const resCorrect = await correctRecognizedText(resTextRecognize);
        if (resCorrect) {
          setCorrectText(resCorrect);
          setCurrState("process");
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false)
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
          style="bg-pink px-4 md:py-2 md:text-base text-sm ml-20 hover:bg-orange"
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

          <div
              className="h-full border border-black bg-gray-100 py-4 mx-20 rounded-lg grid md:grid-cols-2 relative place-items-center"
          >
            {loading ? (
                <div className="col-span-2 flex flex-col items-center justify-center">
                  <h4 className="text-lg font-bold mt-8 mb-4">We have received your request!</h4>
                  <div className="space-y-4" style={{maxWidth: "300px"}}>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-center">
                        <CircularProgress size="lg"/>
                        <span className="text-sm mt-2">Please wait a bit...</span>
                      </div>
                    </div>
                  </div>
                </div>

            ) : (
                <>
                  <div className="flex flex-col justify-between relative h-full w-full items-center px-4">
                    {/* content */}
                    <HandwritingLeft
                        state={currState}
                        handleState={setCurrState}
                        originalInput={imageUrl}
                    />
                  </div>
                  <div className="absolute border-l border-gray-300 py-8 h-3/4 md:block hidden"/>
                  <div className="flex flex-col items-center relative h-full w-full px-8 min-h-60">
                    {/* content */}
                    <HandwritingRight
                        state={currState}
                        handleState={setCurrState}
                        handleForm={handleTextScanning}
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
