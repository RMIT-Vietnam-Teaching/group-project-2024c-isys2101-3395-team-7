import Image from "next/image";
import ReactPlayer from "react-player";

const VoiceLeft = ({ state, handleState, originalInput }) => {
    return (
        <>
            <div className="mb-10 text-center md:border-b-0 border-b pb-5 h-full">
                {(state === "begin") && (
                    <div className="h-full">
                        <p className="md:absolute top-20">Upload your Vietnamese voice recording to get feedback!</p>
                        <div className="h-full grid content-center">
                            <Image src="/voice-guide.png" alt="Image guide" width={500} height={300} />
                        </div>
                    </div>
                )}
                {state === "process" && (
                    <>
                        <h3 className="text-lg font-bold h-20 grid content-center">Original / Bản gốc</h3>
                        <ReactPlayer className="w-fit" url={originalInput} controls />
                        <div className="h-4/5 grid content-center">

                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default VoiceLeft;