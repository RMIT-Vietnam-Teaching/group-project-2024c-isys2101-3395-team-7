import Image from "next/image"

const HandwritingGuide = () => {
    return (
        <>
            <div className={'flex flex-col'}>
                <div className="absolute top-20">Upload your Vietnamese handwritten text to get feedback!</div>
                <div>
                    <Image src="/handwriting-guide.png" alt="Image guide" width={500} height={300} />
                </div>
            </div>
        </>
    )
}

export default HandwritingGuide