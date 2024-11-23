import HandwritingGuide from "./HandwritingGuide"

const HandwritingLeft = ({ state, handleState, originalText }) => {
    return (
        <>
            <div className="flex-1">
                {state == "begin" && <HandwritingGuide />}
                {state == "process" && (
                    <>
                        <h3 className="text-lg font-bold">Original / Bản gốc</h3>
                        <p className="text-gray-700">{originalText || "No text available"}</p>
                    </>
                )}
            </div>
        </>
    )
}

export default HandwritingLeft