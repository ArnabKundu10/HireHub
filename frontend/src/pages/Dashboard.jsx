// src/pages/Dashboard.jsx
import React from "react";
import axios from "../utils/api";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, BarChart2, Briefcase, LogOut } from "lucide-react";

export default function Dashboard() {
  const { sideBtns, SetSideBtns, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/auth/logout/");
      setToken("");
      localStorage.removeItem("token");
      navigate("/auth/register");
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Logged out successfully");
    }
  };

  const menuItems = [
    {
      id: 0,
      label: "Home",
      icon: <Home size={20} />,
      path: "/",
      action: () => SetSideBtns(0),
    },
    {
      id: 1,
      label: "Create Job",
      icon: <Briefcase size={20} />,
      path: "/create-job",
      action: () => SetSideBtns(1),
    },
    {
      id: 2,
      label: "Statistics",
      icon: <BarChart2 size={20} />,
      path: "/statistics",
      action: () => SetSideBtns(2),
    },
    {
      id: 3,
      label: "Company Details",
      icon: <Briefcase size={20} />,
      path: "/company-details",
      action: () => SetSideBtns(3),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 text-center border-b">
          <NavLink to="/" className="text-2xl font-extrabold text-blue-600">
            HireHub
          </NavLink>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
                  isActive || sideBtns === item.id
                    ? "bg-blue-100 text-blue-600"
                    : ""
                }`
              }
              onClick={() => {
                item.action();
                navigate(item.path);
              }}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 w-60 p-6">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="p-4 shadow-sm bg-white">
          <h1 className="text-xl font-semibold text-gray-800">
            {menuItems.find((item) => item.id === sideBtns)?.label || "Welcome"}
          </h1>
        </header>

        <main className="p-6">
          {sideBtns === 0 && (
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Welcome to Your Job Portal
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Post and manage your jobs effortlessly.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <Link
                  to="/create-job"
                  onClick={() => SetSideBtns(1)}
                  className="p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Create a Job
                </Link>
                <Link
                  to="/statistics"
                  onClick={() => SetSideBtns(2)}
                  className="p-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  View Posted Jobs
                </Link>
              </div>
            </div>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  );
}
