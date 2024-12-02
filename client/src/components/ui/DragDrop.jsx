import DragDropIcon from "../icons/DragDropIcon"

const DragDrop = () => {
    return (
        <div>
            <div className="max-w-xl">
                <label
                    className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                    <div className="flex items-center space-x-2">
                        <DragDropIcon />
                        <p className="font-medium text-gray-600">
                            Drag and Drop
                        </p>
                    </div>
                    <input type="file" name="file_upload" className="hidden" />
                </label>
            </div>

        </div>
    )
}

export default DragDrop