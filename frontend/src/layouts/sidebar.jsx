import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Sidebar = ({ active = true }) => {
  const { logout } = useLogout();
  
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-indigo-500 text-white p-6 shadow-xl rounded-r-3xl">
      <h1 className="text-2xl font-bold mb-8 tracking-wide">Admin Panel</h1>
      <nav className="space-y-2">
        {[
          { name: "Dashboard", icon: "bi bi-house", menuLink: "/admin/dashboard" },
          { name: "Admins", icon: "bi bi-person-vcard", menuLink: "/admin/admins" },
          { name: "Users", icon: "bi bi-people", menuLink: "/admin/users" },
          { name: "Seminars", icon: "bi bi-person-video3", menuLink: "/admin/seminars" },
        ].map((item) => (
          <Link 
            key={item.name}
            to={item.menuLink}
            className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-colors duration-200 ${
              active === item.name
                ? "bg-white/20 font-semibold shadow-sm"
                : "hover:bg-white/10"
            }`}
          >
            <i className={`${item.icon} text-lg`}></i>
            {item.name}
          </Link>
        ))}

        <button 
          className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-colors duration-200 hover:bg-white/10 cursor-pointer`}
          onClick={() => logout("/")}
        >
            <i className={`bi bi-door-open text-lg`}></i>
            Logout
          </button>
      </nav>
    </aside>
  );
};