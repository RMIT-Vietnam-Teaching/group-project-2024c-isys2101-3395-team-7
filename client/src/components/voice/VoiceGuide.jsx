import Image from "next/image";

const VoiceGuide = () => {
    return (
        <>
            <div className="h-full">
                <p className="md:absolute top-20">Upload your Vietnamese handwritten text to get feedback!</p>
                <div className="h-full grid content-center">
                    <Image src="/voice-guide.png" alt="Image guide" width={500} height={300} />
                </div>
            </div>
        </>
    )
}

export default VoiceGuide