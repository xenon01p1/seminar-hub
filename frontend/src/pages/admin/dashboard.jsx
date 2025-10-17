import { Sidebar } from "../../layouts/sidebar";
import { Header } from "../../layouts/header";
import KpiCard from '../../components/kpiCard';
import UsersChart from "../../components/admin/usersChart.jsx";
import SeminarsChart from "../../components/admin/seminarsChart.jsx";
import AttendeesChart from "../../components/admin/attendeesChart.jsx";

// NOTE: Define taskProgress inside the component if it's dynamic, 
// or outside if it's a static constant. Defined here for simplicity.
const taskProgress = 50; 

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

export default function Dashboard () {
    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 p-6 sm:p-8"> 
                <Header />
                
                <div className="flex flex-col gap-6 mt-6"> 

                    {/* NEW SECTION: Side-by-Side Layout (KPI Cards 20% | Chart 80%) */}
                    {/* Use flex and flex-row for side-by-side alignment, and gap-6 for spacing */}
                    <div className="flex flex-col lg:flex-row gap-6"> 

                        {/* 1. KPI Cards (Stack vertically, fixed to 20% on large screens) */}
                        <div className="flex flex-col gap-4 lg:w-1/5">
                            <KpiCard
                                title="TOTAL USERS"
                                value="8,421"
                                icon={<CalendarIcon />}
                                accentColorClass="border-indigo-500"
                            />

                            <KpiCard
                                title="TOTAL SEMINARS"
                                value="125"
                                icon={<DollarIcon />}
                                accentColorClass="border-teal-500"
                            />

                            <KpiCard
                                title="ATTENDANCE RATE"
                                value={`${taskProgress}%`}
                                icon={<TaskIcon />}
                                accentColorClass="border-cyan-500"
                            >
                                {/* Progress bar for visualization */}
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div 
                                        className="h-2.5 rounded-full bg-cyan-500" 
                                        style={{ width: `${taskProgress}%` }}
                                    ></div>
                                </div>
                            </KpiCard>
                        </div>

                        {/* 2. Primary Chart (Takes the remaining 80% width) */}
                        <section className="bg-white rounded-xl shadow-md p-6 lg:p-8 lg:w-4/5">
                            <AttendeesChart />
                        </section>
                    </div>
                    
                    {/* 3. Secondary Charts (Two Columns - below the 20/80 split) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="bg-white rounded-xl shadow-md p-6 lg:p-8">
                            <UsersChart />
                        </section>
                        <section className="bg-white rounded-xl shadow-md p-6 lg:p-8">
                            <SeminarsChart />
                        </section>
                    </div>

                </div>
            </main>
        </div>
    );
}