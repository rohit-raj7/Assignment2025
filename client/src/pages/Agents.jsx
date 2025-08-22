import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import axios from "axios";
import { User, Mail, Phone, Lock } from "lucide-react";

export default function Agents() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "", // ✅ changed from phone -> mobile
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate(); // ✅ initialize navigate

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token"); // ✅ get token
      await axios.post("http://localhost:3001/api/agents", form, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send in header
        },
      });

      setMessage({
        type: "success",
        text: "✅ Agent added successfully!",
      });

      setForm({ name: "", email: "", mobile: "", password: "" });

      // ✅ Redirect to Dashboard after short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message || "❌ Failed to add agent.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", type: "text", placeholder: "Full Name", icon: <User /> },
    { name: "email", type: "email", placeholder: "Email Address", icon: <Mail /> },
    { name: "mobile", type: "tel", placeholder: "+91 9876543210", icon: <Phone /> }, // ✅ updated
    { name: "password", type: "password", placeholder: "Password", icon: <Lock /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          👨‍💼 Add New Agent
        </h1>

        {message && (
          <div
            className={`p-3 mb-4 rounded-lg text-center font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((f) => (
            <div
              key={f.name}
              className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-indigo-400"
            >
              <span className="text-gray-400 mr-3">{f.icon}</span>
              <input
                type={f.type}
                name={f.name}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={handleChange}
                className="w-full focus:outline-none text-gray-700"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition transform hover:scale-[1.01] disabled:opacity-60"
          >
            {loading ? "Adding Agent..." : "Add Agent"}
          </button>
        </form>
      </div>
    </div>
  );
}
