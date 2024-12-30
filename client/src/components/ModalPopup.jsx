
export default function ModalPopup({ open, handleClose, title, children }) {
    return (
        <>
            {open && (
                <div className="w-full fixed inset-0 flex items-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
                    <div className="bg-white rounded-lg shadow-lg py-4 w-2/3 mx-auto relative">
                        <h2 className="text-xl font-semibold mb-8">{title}</h2>
                        <div className="h-full border border-black bg-gray-100 py-4 md:mx-20 mx-4 rounded-lg grid md:grid-cols-2 relative place-items-center">
                            {children}
                        </div>
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}