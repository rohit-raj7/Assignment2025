import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import Upload from "./pages/Upload";
import AgentsData from "./pages/AgentData";
import Distribution from './pages/Distribution_reports'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/upload" element={<Upload />} />
           <Route path="/distribution_reports" element={<Distribution />} />
          
           <Route path="/all-agents" element={<AgentsData />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
