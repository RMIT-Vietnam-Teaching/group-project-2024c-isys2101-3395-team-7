import Image from "next/image"

const HandwritingLeft = ({ state, title, question, originalInput }) => {

    return (
        <>
            <div className="mb-10 w-full text-center md:border-b-0 border-b pb-5 h-full">
                {state == "begin" && (
                    <div className="h-full">
                        <h3 className="text-lg font-bold h-20 grid content-center">
                            {title ? title : "Try out Handwriting Detection & Vietnamese Correction Service!"}
                        </h3>
                        {question ? (
                            <div className="text-left w-full md:mx-20 md:my-10">{question}</div>) :
                            (
                                <div className="h-4/5 grid content-center">
                                    <Image src="/handwriting-official-guide.png" alt="Image guide" width={900} height={400} className="w-full" />
                                </div>)}
                    </div>
                )}
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

export default HandwritingLeft