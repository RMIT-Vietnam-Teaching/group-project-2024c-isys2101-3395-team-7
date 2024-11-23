import Image from "next/image"

const HandwritingGuide = () => {
    return (
        <>
            <div>Upload your Vietnamese handwritten text to get feedback!</div>
            <Image src="/handwriting-guide.png" alt="Image guide" width={500} height={300} />
        </>
    )
}

export default HandwritingGuide