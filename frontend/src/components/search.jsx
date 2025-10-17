export default function Search({ onChangeHandler, filterValue }) {
    return (
        <div className="flex items-center mb-6">
            <div className="relative w-full max-w-sm">
                <input
                    type="text"
                    placeholder="Search..."
                    value={filterValue ?? ""}
                    onChange={ onChangeHandler }
                    className="w-full pl-10 pr-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
        </div>
    )
}