import profileImage from '../assets/img/profile.png';
import { AuthContext } from "../context/authContext.jsx";
import { useContext } from 'react';

export function Header() {
  const { currentUser, isAuthChecked } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 capitalize">
        { currentUser.role }
      </h2>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">{ currentUser.username }</span>
        <img
          src={ profileImage }
          alt="profile"
          className="w-10 h-10 rounded-full border-2 border-gray-200 shadow-sm"
        />
      </div>
    </header>
  );
}