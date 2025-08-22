import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return toast.warn("⚠️ Please upload a file.");
    }

    const allowedExtensions = ["csv", "xls", "xlsx"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return toast.error("❌ Only CSV, XLS, and XLSX files are allowed.");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://machinez-test.vercel.app/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`${res.data.message || "File uploaded & distributed!"}`);
      setFile(null);
      setUploaded(true); 
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-center">📂 Upload Leads</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto space-y-4"
      >
        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-3 rounded-lg"
        />
        <div className="mt-3 p-3 rounded-lg border border-blue-300 bg-blue-50 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <p className="text-sm text-blue-700">
            Accepted formats: <b>.csv, .xls, .xlsx</b>
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload & Distribute"}
        </button>
      </form>

      {uploaded && (
        <div className="mt-6 max-w-md mx-auto w-full sm:w-1/2 md:w-1/3">
          <Link
            to="/distribution_reports"
            className="block bg-white p-6 rounded-xl shadow-md transition transform hover:scale-[1.02] hover:shadow-xl hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">📈 Reports</h2>
            <p className="text-gray-600">
              View distribution reports{" "}
              <span className="text-blue-600 font-medium">(Click to view details)</span>.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
