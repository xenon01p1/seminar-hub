import React, { useState, useMemo, useCallback } from 'react';
// Added Home icon for the navigation button
import { User, Mail, Calendar, ListChecks, LockKeyhole, Home } from 'lucide-react';

// --- Hardcoded Data ---

const initialProfile = {
  username: 'Sarah_Codes',
  email: 'sarah.codes@example.com',
  totalSeminarsJoined: 14,
};

const seminarsData = [
  { id: 1, name: 'Advanced React Hooks', date: '2025-10-15', status: 'Completed', instructor: 'Dr. Vega' },
  { id: 2, name: 'State Management with Zustand', date: '2025-11-01', status: 'Upcoming', instructor: 'J. Harper' },
  { id: 3, name: 'Tailwind CSS Mastery', date: '2025-09-20', status: 'Completed', instructor: 'M. Chen' },
  { id: 4, name: 'Optimizing Frontend Performance', date: '2025-12-05', status: 'Upcoming', instructor: 'A. Smith' },
  { id: 5, name: 'Web Accessibility Fundamentals', date: '2025-08-10', status: 'Completed', instructor: 'P. Jones' },
  { id: 6, name: 'Introduction to GraphQL', date: '2025-07-25', status: 'Completed', instructor: 'R. Blake' },
];

// --- Utility Components ---

// A visually styled input field for the forms
const InputField = ({ id, label, type = 'text', value, onChange, icon: Icon, placeholder }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative mt-1 rounded-lg shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-5 w-5 text-sky-400" aria-hidden="true" />
      </div>
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-gray-900 focus:border-sky-500 focus:ring-sky-500 sm:text-sm transition duration-150"
      />
    </div>
  </div>
);

// --- Main Components ---

// 1. Profile Card Component


// 2. Update Profile Form Component


// 3. Seminars Table Component
const SeminarsTable = ({ seminars }) => (
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


// --- Main App Component ---

const App = () => {
  const [profile, setProfile] = useState(initialProfile);

  // Function to simulate navigation back to the landing page
  const handleGoHome = () => {
    console.log("Navigating back to the landing page... (Simulated)");
    // In a real application, you would use a router (e.g., useNavigate from react-router-dom) here.
    alert('Going back to the home page! (Simulated Action)');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <header className="mb-8 p-4 bg-white rounded-xl shadow-md border-b-4 border-sky-400">
        {/* Updated header layout to include the Home button */}
        <div className="flex justify-between items-start flex-wrap gap-4">
          {/* Title/Branding block */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
              <svg className="w-8 h-8 text-sky-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 16a4 4 0 003.5-2h-7a4 4 0 003.5 2z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
              Seminar Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, manage your profile and joined courses.</p>
          </div>
          
          {/* Home Button */}
          <button
            onClick={handleGoHome}
            className="flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 transform hover:scale-[1.02] self-center"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Landing Page</span>
            <span className="sm:hidden">Home</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Profile Card and Update Form */}
        <div className="space-y-8">
          <ProfileCard profile={profile} />
          <ProfileForm profile={profile} setProfile={setProfile} />
        </div>

        {/* Right Column: Seminars Table */}
        <div className="lg:col-span-2">
          <SeminarsTable seminars={seminarsData} />
        </div>

      </div>
    </div>
  );
};

export default App;
