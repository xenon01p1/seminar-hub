import { Mail, Calendar } from 'lucide-react';
import { useGetTotalJoinedSeminars } from '../../hooks/useSeminarsJoined';

export default function ProfileCard () {

    const adminString = localStorage.getItem("user");
    const userData =  adminString && adminString !== 'undefined'
        ? JSON.parse(adminString) 
        : null; 
    
    const { isLoading, error, data } = useGetTotalJoinedSeminars(userData?.id);

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-sky-500 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-sky-200 shadow-lg">
                {userData.username.charAt(0)}
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">{userData.username}</h2>
            <div className="space-y-2 text-gray-600 w-full">
                <div className="flex items-center space-x-2 justify-center">
                <Mail className="w-5 h-5 text-sky-500" />
                <span className="font-medium">{userData.email}</span>
                </div>
                <div className="flex items-center space-x-2 justify-center text-lg bg-sky-50 rounded-lg p-2 font-semibold text-sky-700">
                <Calendar className="w-5 h-5" />
                <span>{ data ?? 0 } Seminars Joined</span>
                </div>
            </div>
            </div>
        </div>
    );
}