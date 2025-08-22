import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = "https://machinez-test.vercel.app/api/auth";
 
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? "login" : "signup";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const { data } = await axios.post(`${API_URL}/${endpoint}`, payload);

      if (isLogin) {
        if (data.token) { 
          localStorage.setItem("token", data.token);
          if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

          toast.success("Login successful!");

          
          setTimeout(() => {
            navigate("/dashboard");
            window.location.reload(); 
          }, 1000);
        }
      } else {
        toast.success("🎉 Signup successful! Please login.");
        setTimeout(() => {
          setIsLogin(true);
          setFormData({ name: "", email: "", password: "" });
        }, 2000);
      }
    } catch (err) {
      toast.error(`❌ ${err.response?.data?.message || "Something went wrong!"}`);
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
