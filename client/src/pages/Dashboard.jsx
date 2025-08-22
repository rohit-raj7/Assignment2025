import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/agents"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">👨‍💼 Manage Agents</h2>
          <p className="text-gray-600">Add and manage sales agents.</p>
        </Link>
        <Link
          to="/upload"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">📂 Upload Leads</h2>
          <p className="text-gray-600">Upload and distribute leads among agents.</p>
        </Link>
        <Link to='/distribution_reports'
         className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">📈 Reports</h2>
          <p className="text-gray-600">View distribution reports (Coming Soon).</p>
        </Link>

        {/* New Card */}
        <Link
          to="/all-agents"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">👀 View All Agents</h2>
          <p className="text-gray-600">Click to see all agents list.</p>
        </Link>
      </div>
    </div>
  );
}
