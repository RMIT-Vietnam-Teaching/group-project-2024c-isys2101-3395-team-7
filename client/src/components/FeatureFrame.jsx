import HandwritingRight from "./handwriting/HandwritingRight";
import HandwritingLeft from "./handwriting/HandwritingLeft";
import VoiceRight from "./voice/VoiceRight";
import VoiceLeft from "./voice/VoiceLeft";

const FeatureFrame = ({ type, props, isExercise = false }) => {
  return (
    <>
      <div className="flex flex-col justify-between relative h-full w-full items-center px-4 overflow-y-auto">
        {type === "handwriting" ? (
          <HandwritingLeft
            state={props?.currState || "process"}
            handleState={props?.setCurrState}
            originalInput={props?.imageUrl} // handle image here
            question={props?.question}
            title={props?.title}
          />
        ) : (
          <VoiceLeft
            state={props?.currState || "process"}
            handleState={props?.setCurrState}
            originalInput={props?.audioUrl}
            rawText={props?.recognizedText}
            question={props?.question}
            title={props?.title}
          />
        )}
      </div>
      {!isExercise && <div className="absolute border-l border-gray-300 py-8 h-3/4 md:block hidden" />}

      <div className="flex flex-col items-center relative h-full w-full px-8 min-h-60 overflow-y-auto">
        {type === "handwriting" ? (
          <HandwritingRight
            state={props?.currState || "process"}
            handleState={props?.setCurrState}
            handleForm={props?.handleSubmit}
            comments={props?.comments || []}
            rawText={props?.recognizedText || ""}
            correctText={props?.correctText || props?.answer || ""}
            isExercise={isExercise}
          />
        ) : (
          <VoiceRight
            state={props?.currState || "process"}
            handleState={props?.setCurrState}
            handleForm={props?.handleSubmit}
            comments={props?.comments || []}
            rawText={props?.recognizedText || ""}
            correctedText={props?.correctText || props?.answer || ""}
            resultAudio={props?.resultAudio} // replace with resultAudio after handle api response
            isExercise={isExercise}
          />
        )}
      </div>
    </>
  );
};

export default FeatureFrame;
