import KpiCard from '../kpiCard';
import { useGetTotalAttendees } from "../../hooks/useAttendees";
import { useGetTotalSeminars } from "../../hooks/useSeminars";
import { useGetTotalUsers } from "../../hooks/useUsers";

// --- Icon Definitions --- (Keep these outside the component for performance)
const CalendarIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
);

const DollarIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>
);

const TaskIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 12h.01" />
</svg>
);
// ------------------------------

export default function AdminKpi() {

    const { 
        isLoading: isAttendeesLoading, 
        error: errorAttendees, 
        data: dataAttendees
    } = useGetTotalAttendees();

    const { 
        isLoading: isSeminarsLoading, 
        error: errorSeminars, 
        data: dataSeminars
    } = useGetTotalSeminars();

    const { 
        isLoading: isUsersLoading, 
        error: errorUsers, 
        data: dataUsers
    } = useGetTotalUsers();

    if (isAttendeesLoading || isSeminarsLoading || isUsersLoading) return <div>Loading...</div>;

    console.log(dataAttendees?.[0]);
    console.log(dataSeminars?.[0]);
    console.log(dataUsers?.[0]);

    return (
        <>
            <KpiCard
                title="TOTAL USERS"
                value={dataUsers?.[0]?.total_users ?? 0}
                icon={<CalendarIcon />}
                accentColorClass="border-indigo-500"
            />

            <KpiCard
                title="TOTAL SEMINARS"
                value={ dataSeminars?.[0]?.total_seminars ?? 0 }
                icon={<DollarIcon />}
                accentColorClass="border-teal-500"
            />

            <KpiCard
                title="TOTAL ATTENDANCE"
                value={ dataAttendees?.[0]?.total_attendees ?? 0 }
                icon={<TaskIcon />}
                accentColorClass="border-cyan-500"
            />
        </>
    );
}