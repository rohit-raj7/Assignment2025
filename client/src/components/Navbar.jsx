import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout successfully!");
    setIsLoggedIn(false);

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  const handleLogin = () => {
    navigate("/"); // redirect to login page
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo / App Name */}
      <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">
        LeadManager
      </Link>
      <div className="hidden md:flex items-center space-x-6">

        {isLoggedIn && (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/agents"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Agents
            </Link>
            <Link
              to="/upload"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Upload
            </Link>
          </>
        )}

        {/* ✅ Show Login if not logged in, else Logout */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        )}
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
          {/* ✅ Only show if logged in */}
          {isLoggedIn && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-indigo-600"
              >
                Dashboard
              </Link>
              <Link
                to="/agents"
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-indigo-600"
              >
                Agents
              </Link>
              <Link
                to="/upload"
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-indigo-600"
              >
                Upload
              </Link>
            </>
          )}

          {/* ✅ Conditional button in mobile menu */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
