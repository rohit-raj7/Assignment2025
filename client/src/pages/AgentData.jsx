import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AllAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get("https://machinez-test.vercel.app/api/agents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgents(res.data);

        // ✅ success notification
        toast.success("✅ Agents loaded successfully!");
      } catch (err) {
        setError("Failed to fetch agents. Please login again.");
        toast.error("❌ Failed to fetch agents!");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAgents();
    } else {
      setError("No token found. Please login.");
      toast.warning("⚠️ No token found. Please login.");
      setLoading(false);
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://machinez-test.vercel.app/api/agents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents(agents.filter((agent) => agent._id !== id));

      // ✅ delete success notification
      toast.success("🗑️ Agent deleted successfully!");
    } catch (err) {
      toast.error("❌ Failed to delete agent.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">👨‍💼 All Agents</h1>

      {loading ? (
        <p className="text-gray-600">⏳ Loading agents...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : agents.length === 0 ? (
        <p className="text-gray-600">No agents found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="bg-white p-6 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{agent.name}</h3>
                <p className="text-gray-600">{agent.email}</p>
              </div>
              <button
                onClick={() => handleDelete(agent._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                ❌ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
