import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Documents from "./pages/Documents"; // Make sure this path is correct
import Dashboard from "./pages/Dashboard";
import Reports from './pages/Reports';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100 min-h-screen p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />  {/* Optional: set as default */}
            <Route path="/dashboard" element={<Dashboard />} />               {/* ✅ Add this */}
            <Route path="/portfolio-analysis" element={<Documents />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
