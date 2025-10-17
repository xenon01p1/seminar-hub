import { flexRender } from '@tanstack/react-table';

// Table component
const TidyTable = ({ table }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-xl shadow-md overflow-hidden">
        <TableHeader table={table} />
        <TableBody table={table} />
      </table>
    </div>
  );
};

// TableHeader component
const TableHeader = ({ table }) => {
  return (
    <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className="px-6 py-3 text-left font-medium cursor-pointer select-none"
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              <SortIndicator sortedState={header.column.getIsSorted()} />
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

// TableBody component
const TableBody = ({ table }) => {
  return (
    <tbody className="divide-y divide-gray-200">
      {table.getRowModel().rows.map((row, i) => (
        <tr
          key={row.id}
          className={`hover:bg-gray-100 ${i % 2 === 0 ? 'bg-gray-50' : ''}`}
        >
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="px-6 py-3 text-gray-700">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

// SortIndicator component
const SortIndicator = ({ sortedState }) => {
  if (sortedState === false) return null;
  return <span>{{ asc: ' 🔼', desc: ' 🔽' }[sortedState]}</span>;
};

export default TidyTable;