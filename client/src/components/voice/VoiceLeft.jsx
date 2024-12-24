import Image from "next/image";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";

const VoiceLeft = ({
  state,
  handleState,
  correctText,
  originalInput,
  rawText,
}) => {
  const [transcript, setTranscript] = useState(
    "Your speech will appear here..."
  );

  // Update transcript with the correctText when available
  useEffect(() => {
    if (correctText) {
      setTranscript(correctText.comment); // Update the transcript state
    }
  }, [correctText]); // Runs whenever correctText is updated

  return (
    <>
      <div className="mb-10 text-center md:border-b-0 border-b pb-5 h-full w-full">
        {state === "begin" && (
          <div className="h-full">
            <h3 className="text-lg font-bold h-20 grid content-center">
              Try out Voice Detection & Vietnamese Correction Service!
            </h3>
            <div className="h-4/5 grid content-center">
              <Image
                src="/voice-official-guide.png"
                alt="Image guide"
                width={900}
                height={400}
                className="w-full"
              />
            </div>
          </div>
        )}
        {state === "process" && (
          <div className="h-full w-full flex flex-col justify-center items-center gap-6">
            <div className={"w-full"}>
              <h3 className="text-lg font-bold">Original / Bản gốc</h3>
            </div>
            <div className={"flex flex-col gap-6 w-full"}>
              <div className="mb-5">
                <br />
                {/* replace with the responded audio from api */}
                <ReactPlayer
                  className="w-full"
                  url={originalInput}
                  controls
                  width="100%"
                  height="50px"
                />
              </div>
              {/*Insert Transcript text from API (before correction) here*/}
              {rawText && (
                <div>
                  <span className="font-bold text-left">
                    Recognized Text from your audio:
                  </span>
                  <textarea
                    className="block w-full p-4 border border-gray-300 rounded-lg resize-y bg-gray-100 text-black overflow-y-auto"
                    value={rawText}
                    placeholder="Transcript Texts From Fixed Audio will be displayed here."
                    readOnly
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VoiceLeft;
