// src/pages/Distribution_reports.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function AllAgents() {
  const [agents, setAgents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get("https://machinez-test.vercel.app/api/leads/grouped", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgents(res.data);
      } catch (err) {
        console.error("❌ Fetch agents error:", err);
        setError("⚠️ Failed to fetch agents. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAgents();
    } else {
      setError("⚠️ No token found. Please login.");
      setLoading(false);
    }
  }, [token]);

  if (loading)
    return <p className="text-center text-lg font-medium">⏳ Loading agents...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        👥 Agents & Their Leads
      </h1>

      {/* Agents list */}
      <div className="space-y-8">
        {Object.values(agents).map((group, idx) => {
          const agent = group.agent || {
            _id: `unassigned-${idx}`,
            name: "Unassigned",
            email: "-",
            mobile: "-",
          };

          return (
            <div
              key={agent._id || idx}
              className="rounded-2xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Agent Info */}
              <div className="border-b pb-3 mb-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  {agent.name}
                </h2>
                <p className="text-gray-600 text-sm">📧 {agent.email}</p>
                <p className="text-gray-600 text-sm">📱 {agent.mobile}</p>
              </div>

              {/* Leads as separate cards */}
              <h3 className="font-medium text-gray-700 mb-4">
                📋 Assigned Leads:
              </h3>
              {group.items?.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((lead) => (
                    <div
                      key={lead._id}
                      className="bg-gray-50 rounded-xl border shadow-sm p-4 hover:shadow-md transition"
                    >
                      <p className="text-lg font-semibold text-gray-800">
                        {lead.firstName}
                      </p>
                      <p className="text-sm text-gray-600">📱 {lead.phone}</p>
                      {lead.notes && (
                        <p className="text-sm text-gray-500 mt-1">
                          📝 {lead.notes}
                        </p>
                      )}
                      <div className="mt-3 text-xs text-gray-400 space-y-1">
                        <p>
                          🕒 Created:{" "}
                          {new Date(lead.createdAt).toLocaleString()}
                        </p>
                        <p>
                          🔄 Updated:{" "}
                          {new Date(lead.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No leads assigned.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
