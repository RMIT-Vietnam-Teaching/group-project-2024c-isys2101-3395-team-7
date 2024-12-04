import VoiceGuide from "@/components/voice/VoiceGuide";

const VoiceLeft = ({state, handleState, originalInput}) => {
    return (
        <>
            <div className="mb-10 text-center md:border-b-0 border-b pb-5 h-full">
                {state === "begin" && <VoiceGuide />}
                {state === "process" && (
                    <>
                        <h3 className="text-lg font-bold h-20 grid content-center">Original / Bản gốc</h3>
                        <div className="h-4/5 grid content-center">
                            <img className="max-h-80 md:max-h-full" src={originalInput} alt="Original Image" />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default VoiceLeft;