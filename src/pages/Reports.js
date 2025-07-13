import React, { useEffect, useState } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/get-reports")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Fetched reports:", data);
        setReports(data);
      })
      .catch((err) => console.error("Failed to fetch reports", err));
  }, []);
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-6">Saved Reports</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Entities</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{report.id}</td>
                <td className="px-4 py-2">
                  {report.entity_a} vs {report.entity_b}
                </td>
                <td className="px-4 py-2">
                  {new Date(report.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => console.log(report.summary)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
