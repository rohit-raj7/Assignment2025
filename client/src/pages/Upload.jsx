import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return setMessage("⚠️ Please upload a file.");
    }

    // validate extension
    const allowedExtensions = ["csv", "xls", "xlsx"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return setMessage("❌ Only CSV, XLS, and XLSX files are allowed.");
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);

      // get token from localStorage
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:3001/api/upload", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ Apply token
        },
      });

      setMessage(`✅ ${res.data.message || "File uploaded & distributed!"}`);
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">📂 Upload Leads</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-md space-y-4"
      >
        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-3 rounded-lg"
        />
        <p className="text-sm text-gray-500">
          ✅ Accepted formats: <b>.csv, .xls, .xlsx</b>
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload & Distribute"}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 rounded-lg bg-gray-100 text-sm font-medium">
          {message}
        </div>
      )}
    </div>
  );
}
