import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";

export const Sidebar = ({ active = true }) => {
  const { logout } = useLogout();
  
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-indigo-500 text-white p-6 shadow-xl rounded-r-3xl">
      <h1 className="text-2xl font-bold mb-8 tracking-wide">Admin Panel</h1>
      <nav className="space-y-2">
        {[
          { name: "Dashboard", icon: "🏠", menuLink: "/admin/dashboard" },
          { name: "Admins", icon: "📊", menuLink: "/admin/admins" },
          { name: "Users", icon: "👥", menuLink: "/admin/users" },
          { name: "Seminars", icon: "⚙️", menuLink: "/admin/seminars" },
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
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}

        <button 
          className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-colors duration-200 hover:bg-white/10 cursor-pointer`}
          onClick={() => logout("/")}
        >
            <span className="text-lg">🚪</span>
            Logout
          </button>
      </nav>
    </aside>
  );
};