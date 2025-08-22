import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/api/auth";

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = isLogin ? "login" : "signup";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const { data } = await axios.post(`${API_URL}/${endpoint}`, payload);

      if (isLogin) {
        // ✅ After login -> Save token and go to dashboard
        if (data.token) {
          localStorage.setItem("token", data.token);
          if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

          setSuccess("Login successful! Redirecting...");
          setTimeout(() => navigate("/dashboard"), 1000);
        }
      } else {
        // ✅ After signup -> switch to Login form
        setSuccess("Signup successful! Please login.");
        setTimeout(() => {
          setIsLogin(true);
          setFormData({ name: "", email: "", password: "" }); // clear form
          setSuccess("");
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Welcome Back 👋" : "Create an Account ✨"}
        </h2>

        {/* Toggle Buttons */}
        <div className="flex mb-6 justify-center bg-gray-100 rounded-full overflow-hidden">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 text-sm font-medium transition-all ${
              isLogin ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 text-sm font-medium transition-all ${
              !isLogin ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-center text-red-500 font-medium">{error}</div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-4 text-center text-green-600 font-medium">{success}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* Switch text */}
        <p className="text-center mt-6 text-sm text-gray-600">
          {isLogin ? "Don’t have an account?" : "Already registered?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-blue-600 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
