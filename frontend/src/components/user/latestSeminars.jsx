import { ListChecks } from 'lucide-react';

export default function LatestSeminars ({ seminars }){

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl lg:col-span-2 overflow-x-auto">
            <h3 className="text-xl font-bold mb-6 text-sky-700 border-b pb-2 border-sky-100 flex items-center">
            <ListChecks className="w-6 h-6 mr-2" /> Joined Seminars History
            </h3>
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-sky-50">
                <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider rounded-tl-lg">
                    Seminar Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">
                    Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider hidden sm:table-cell">
                    Instructor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider rounded-tr-lg">
                    Status
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {seminars.map((seminar) => (
                <tr key={seminar.id} className="hover:bg-sky-50 transition duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {seminar.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {seminar.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {seminar.instructor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        seminar.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        {seminar.status}
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}