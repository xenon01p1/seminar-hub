import React, { useContext, useEffect } from 'react';
// Added Home icon for the navigation button
import { Home } from 'lucide-react';
import { useGetTotalJoinedSeminars } from '../../hooks/useSeminarsJoined.js';
import LatestSeminars from '../../components/user/latestSeminars.jsx';
import ProfileCard from '../../components/user/profileCard.jsx';
import ProfileForm from '../../components/user/profileForm.jsx';
import { AuthContext } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';

const seminarsData = [
  { id: 1, name: 'Advanced React Hooks', date: '2025-10-15', status: 'Completed', instructor: 'Dr. Vega' },
  { id: 2, name: 'State Management with Zustand', date: '2025-11-01', status: 'Upcoming', instructor: 'J. Harper' },
  { id: 3, name: 'Tailwind CSS Mastery', date: '2025-09-20', status: 'Completed', instructor: 'M. Chen' },
  { id: 4, name: 'Optimizing Frontend Performance', date: '2025-12-05', status: 'Upcoming', instructor: 'A. Smith' },
  { id: 5, name: 'Web Accessibility Fundamentals', date: '2025-08-10', status: 'Completed', instructor: 'P. Jones' },
  { id: 6, name: 'Introduction to GraphQL', date: '2025-07-25', status: 'Completed', instructor: 'R. Blake' },
];


const UserProfile = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { data } = useGetTotalJoinedSeminars(currentUser?.id);

  const handleGoHome = () => {
    navigate('/');
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
          <ProfileCard profile={ currentUser } totalJoinedSeminar={ data } />
          <ProfileForm />
        </div>

        {/* Right Column: Seminars Table */}
        <div className="lg:col-span-2">
          <LatestSeminars seminars={seminarsData} profile={ currentUser } />
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
