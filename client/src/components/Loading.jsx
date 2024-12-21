import CircularProgress from "@/components/CircularProgress";

const Loading = () => {
    return (
        <div className="col-span-2 flex flex-col items-center justify-center">
            <h4 className="text-lg font-bold mt-8 mb-4">
                We have received your request!
            </h4>
            <div className="space-y-4" style={{ maxWidth: "300px" }}>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                        <CircularProgress size="lg" />
                        <span className="text-sm mt-2">Please wait a bit...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading