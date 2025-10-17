import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Outlet } from 'react-router-dom'; 

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            <Sidebar />

            <main className="flex-1 p-8">
                <Header />

                <section className="bg-white rounded-2xl shadow-lg p-8 transition-all">
                  <Outlet /> 
                </section>
              </main>
        </div>
    );
}