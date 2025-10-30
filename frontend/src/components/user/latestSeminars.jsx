import { useState, useMemo } from 'react';
import moment from 'moment';
import { ListChecks } from 'lucide-react';
import TidyTable from "../../components/table.jsx";
import RangedPagination from "../../components/rangedPagination.jsx";
import { useGetLatestSeminars } from "../../hooks/useSeminarsJoined.js";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

export default function LatestSeminars ({ seminars, profile }){

    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const { isLoading, error, data } = useGetLatestSeminars(profile?.id);

    // 💡 PAGINATION STATE (Set pageSize to 2 for easy testing)
    const [pagination, setPagination] = useState({
        pageIndex: 0, 
        pageSize: 2, 
    });

    const joinedSeminarDatas = useMemo(
        () => data || [],
        [data]
    );

    console.log(data);

    // --- TABLE SET UP ---
    const columns = useMemo(
        () => [
          { header: "Title", accessorKey: "title" },
          { header: "Link", accessorKey: "link" },
          { header: "Pass Code", accessorKey: "pass_code" },
          { 
            header: "Start Date", 
            accessorKey: "start_at",
            cell: ({ row }) => {
                const startDate = moment(row).format('MMMM Do YYYY');
                const startTime = moment(row).format('h:mm:ss a');

                return (
                    <>
                        { startDate } <br /> { startTime }
                    </>
                )
            }
          },
          { 
            header: "Status", 
            id: "status",
            cell: ({ row }) => {
                // FIX 2: Get the start_at value from the row's original data
                const seminarDate = row.original.start_at; 
                
                if (!seminarDate) {
                    return <span style={{ color: 'gray' }}>N/A</span>;
                }

                // Logic to determine status
                const now = moment();
                const isUpcoming = moment(seminarDate).isAfter(now);
                
                const statusText = isUpcoming ? "Upcoming" : "Closed";
                const style = {
                    fontWeight: 'bold',
                    color: isUpcoming ? 'blue' : ''
                };

                return <span style={style}>{statusText}</span>;
            },
        },
        ],
        []
    );
    
    const table = useReactTable({
        data: joinedSeminarDatas,
        columns,
        
        state: {
          sorting,
          globalFilter,
          pagination
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination, 
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    if (isLoading) return <div className='text-center mx-auto'>Loading data....</div>
    if (error) return <div className='text-center mx-auto'>Error encountered. Please report this to the developer.</div>

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl lg:col-span-2 overflow-x-auto">
            <h3 className="text-xl font-bold mb-6 text-sky-700 border-b pb-2 border-sky-100 flex items-center">
            <ListChecks className="w-6 h-6 mr-2" /> Joined Seminars History
            </h3>
            
            <TidyTable table ={ table } />

            {/* Buttons */}
            <div className="space-x-2">
              <RangedPagination 
                table={ table }
              />
            
            </div>
        </div>
    );
}