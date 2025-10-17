export default function FormModal({ isShow, onClose, formHandler, title = "Confirmation", children }) {
    if (!isShow) {
        return null;
    }

    // Recommended backdrop classes for modern frosted glass:
    const backdropClasses = "absolute inset-0 bg-gray-900 bg-opacity-30 backdrop-blur-sm transition-opacity";

    return (
        // Modal Wrapper: Fixed position, full screen (The Z-Index must be high)
        // **KEY CHANGE 1: Add overflow-y-auto to allow the entire modal wrapper to scroll if the modal content itself exceeds the viewport height.**
        <div
            id="blueModal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            tabIndex="-1"
        >
            {/* 1. MODAL BACKDROP (Sibling to Content, Z-index 40) */}
            <div
                id="modalBackdrop"
                className="absolute inset-0 bg-gray-900/30 bg-opacity-30 z-40 fixed translate-z-0" 
                aria-hidden="true"
            />
            
            {/* 2. MODAL CONTENT (Z-index 50) */}
            {/* **KEY CHANGE 2: Add max-h-full to ensure the modal container respects the parent's (the wrapper's) scrollable area.** */}
            <div
                className="modal-container relative w-full max-w-lg mx-auto my-12 opacity-100 transform translate-y-0 transition-all duration-300 ease-out z-50 max-h-full"
                onClick={e => e.stopPropagation()} 
            >
                <form onSubmit={formHandler}>
                    {/* **KEY CHANGE 3: Add max-h-full and flex/flex-col to make the inner content container take up max height and arrange children vertically.** */}
                    {/* **KEY CHANGE 4: Use 'h-auto' if you don't want to enforce a fixed max height on the *entire* modal content and instead rely on the wrapper's scroll.** */}
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-full">
                        
                        {/* Header (fixed height) */}
                        <div className="p-5 flex justify-between items-center flex-shrink-0">
                            <h3 id="modalTitle" className="text-xl font-bold">{title}</h3>
                            <button
                                id="closeModalButtonTop"
                                aria-label="Close modal"
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition p-1 flex-shrink-0"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <hr className="border-gray-200 flex-shrink-0" />

                        {/* Body Content (The scrollable part) */}
                        {/* **KEY CHANGE 5: Add overflow-y-auto to this section to enable scrolling within the modal body. 'flex-grow' ensures it takes up all available vertical space.** */}
                        <div className="p-6 md:p-8 space-y-4 overflow-y-auto flex-grow">
                            {children}
                        </div>

                        {/* Footer / Actions (fixed height) */}
                        <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-200 flex-shrink-0">
                            <button
                                id="cancelButton"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                id="confirmButton"
                                type="submit"
                                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}