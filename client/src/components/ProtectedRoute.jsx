import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token/session
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo / App Name */}
      <div className="text-2xl font-bold text-indigo-600">
        LeadManager
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium">
          Dashboard
        </Link>
        <Link to="/agents" className="text-gray-700 hover:text-indigo-600 font-medium">
          Agents
        </Link>
        <Link to="/upload" className="text-gray-700 hover:text-indigo-600 font-medium">
          Upload
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-3 px-6 py-4 md:hidden">
          <Link to="/dashboard" onClick={() => setOpen(false)} className="text-gray-700 hover:text-indigo-600">
            Dashboard
          </Link>
          <Link to="/agents" onClick={() => setOpen(false)} className="text-gray-700 hover:text-indigo-600">
            Agents
          </Link>
          <Link to="/upload" onClick={() => setOpen(false)} className="text-gray-700 hover:text-indigo-600">
            Upload
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
