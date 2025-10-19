import profileImage from '../assets/img/profile.png';

export function Header() {
  const adminString = localStorage.getItem("user");
  const admin =  adminString && adminString !== 'undefined'
    ? JSON.parse(adminString) 
    : null; 

  return (
    <header className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 capitalize">
        { admin.role }
      </h2>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">{ admin.username }</span>
        <img
          src={ profileImage }
          alt="profile"
          className="w-10 h-10 rounded-full border-2 border-gray-200 shadow-sm"
        />
      </div>
    </header>
  );
}