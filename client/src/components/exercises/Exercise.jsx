"use client";
import FeatureFrame from "@/components/FeatureFrame";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import { pushError, pushSuccess } from "../Toast";
import { extractText } from "../helper/ExtractText";
import {
  recognizeHandwriting,
  correctRecognizedText,
  recognizeVoice,
  correctRecognizedTextVoice,
  createAiVoice,
  uploadImage,
  uploadAudio,
  compareHandwritingAnswer,
} from "@/api";

const Exercise = ({ currQuestion, exercises }) => {
  const questionObj = exercises[currQuestion];
  const [currState, setCurrState] = useState("begin");
  const [imageUrl, setImageUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [correctText, setCorrectText] = useState(null);
  const [resultAudio, setResultAudio] = useState(null);
  const [comments, setComments] = useState([]);
  const formData = new FormData();
  const [loading, setLoading] = useState(false);

  // reset variables when current question changes
  useEffect(() => {
    setCurrState("begin");
    setImageUrl(null);
    setAudioUrl(null);
    setRecognizedText("");
    setCorrectText(null);
    setLoading(false);
    setComments([]);
  }, [currQuestion]);

  const handleFileChange = (file) => {
    if (questionObj.type === "handwriting") {
      if (file instanceof File) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else if (questionObj.type === "audio") {
      if (file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAudioUrl(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  //   const handleCorrectText = async (recognizedTextData) => {
  //     if (recognizedTextData) {
  //       setRecognizedText(
  //         recognizedTextData.text ? recognizedTextData.text : recognizedTextData
  //       );
  //       // let correctTextData;
  //       if (questionObj.type === "hand-writing") {
  //         const correctTextData = await correctRecognizedText(recognizedTextData);
  //         setCorrectText(extractText(correctTextData, "corrected_text"));
  //         setComments(extractText(correctTextData, "errors")); // Extract comments
  //       } else if (questionObj.type === "audio") {
  //         const correctTextData = await correctRecognizedTextVoice(
  //           recognizedTextData
  //         );
  //         const correctedText = extractText(correctTextData, "corrected_text");
  //         setCorrectText(correctedText);
  //         setComments(extractText(correctTextData, "errors")); // Extract comments
  //         const resAudio = await createAiVoice(correctedText);
  //         resAudio && setResultAudio(resAudio);
  //       }

  //       setCurrState("process");
  //     }
  //     return null;
  //   };

  const handleSubmit = async (file) => {
    setLoading(true);
    try {
      let recognizedTextData;
      if (questionObj.type === "handwriting") {
        formData.append("image", file);
        handleFileChange(formData.getAll("image")[0]);
        recognizedTextData = await recognizeHandwriting(formData);

        if (recognizedTextData) {
          const correct = await compareHandwritingAnswer(
            recognizedTextData,
            questionObj.ref_answer
          );

          if (correct) {
            console.log("Correct answer:", correct.feedback);
            setComments(extractText(correct, "feedback"));
            setCorrectText(questionObj.ref_answer);
          }
        }

        await uploadImage(file);
      } else if (questionObj.type === "audio") {
        setAudioUrl(URL.createObjectURL(file));
        formData.append("audio", file);
        handleFileChange(formData.getAll("file")[0]);
        recognizedTextData = await recognizeVoice(formData);
        await uploadAudio(file);
      }
      pushSuccess("Successfully submitted!");
      setCurrState("process");
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={"w-full h-full overflow-y-auto"}>
        {loading ? (
          <Loading />
        ) : (
          <FeatureFrame
            type={questionObj.type}
            isExercise={true}
            props={{
              currState,
              setCurrState,
              title: `Question ${currQuestion + 1}`,
              question: questionObj?.question,
              correctText,
              recognizedText,
              handleSubmit,
              handleFileChange,
              imageUrl,
              audioUrl,
              comments,
              resultAudio,
            }}
          />
        )}
      </div>
    </>
  );
};

export default Exercise;
