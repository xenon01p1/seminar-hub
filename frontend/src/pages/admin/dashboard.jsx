import { Sidebar } from "../../layouts/sidebar";
import { Header } from "../../layouts/header";
import AdminKpi from "../../components/admin/adminKpi.jsx";
import UsersChart from "../../components/admin/usersChart.jsx";
import SeminarsChart from "../../components/admin/seminarsChart.jsx";
import AttendeesChart from "../../components/admin/attendeesChart.jsx";

export default function Dashboard () {
    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 p-6 sm:p-8"> 
                <Header />
                
                <div className="flex flex-col gap-6 mt-6"> 

                    {/* 1. KPI Cards (Stack vertically, fixed to 20% on large screens) */}
                    <div className="flex flex-row gap-4 w-full">
                        <AdminKpi />
                    </div>

                    {/* 2. Primary Chart (Takes the remaining 80% width) */}
                    <section className="bg-white rounded-xl shadow-md p-6 lg:p-8 w-full">
                        <AttendeesChart />
                    </section>
                    
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