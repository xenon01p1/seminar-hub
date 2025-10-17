export default function RangedPagination({ table }) { // 👈 REMOVE start and end from props
    const maxPagesToShow = 5;
    const currentPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    // If there are no pages or only one, render nothing.
    if (pageCount <= 1) return null; 

    // --- Page Centering Logic (Kept as is) ---
    let startPage = Math.max(1, currentPageIndex + 1 - 2); 
    let endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    // ----------------------------------------

    const finalLength = endPage - startPage + 1;

    const numbersInRange = Array.from({ length: finalLength }, (_, index) => {
        return startPage + index; // Start from startPage and add the index
    });

    return (
        <div className="flex space-x-1">
            {numbersInRange.map((pageNumber) => {
                const pageIndex = pageNumber - 1; 
                const isActive = pageIndex === currentPageIndex;

                return (
                    <button
                        key={pageNumber}
                        className={`px-3 py-1 rounded transition-colors ${
                            isActive ? 'bg-blue-600 text-white font-bold' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => table.setPageIndex(pageIndex)}
                    >
                        {pageNumber}
                    </button>
                );
            })}
        </div>
    );
}