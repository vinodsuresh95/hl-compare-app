import Sidebar from '../components/Sidebar';
import React, { useState } from 'react';


const HLCompareDashboard = () => {
    const [file, setFile] = useState(null);
    const [entityA, setEntityA] = useState('');
    const [entityB, setEntityB] = useState('');
    const [query, setQuery] = useState('');
    const [analysisReady, setAnalysisReady] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);
  
    const handleCompare = async () => {
      if (!file || !entityA || !entityB || !query) {
        alert("Please complete all fields.");
        return;
      }
  
      // Simulated API response
      setTimeout(() => {
        setAnalysisData({
          overview: `This multi-document analysis of ${entityA} versus ${entityB} is based on 1 source document...`,
          recommendation: `Based on comprehensive evidence...`,
          confidence: `High Confidence`,
          matrix: [
            {
              category: "📁 Investment Thesis",
              apple: `${entityA} analysis content`,
              meta: `${entityB} analysis content`
            },
            {
              category: "📊 Valuation Metrics",
              apple: "P/E Ratio: 20x, EPS growth 15%",
              meta: "P/E Ratio: 18x, EPS growth 18%"
            }
          ]
        });
        setAnalysisReady(true);
      }, 1500);
    };
  
    return (
      <div className="flex">
        <Sidebar /> 
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <div className="bg-white rounded shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Upload Research Document:</h2>
            <input type="file" multiple onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="Entity A"
                value={entityA}
                onChange={(e) => setEntityA(e.target.value)}
                className="flex-1 border rounded p-2"
              />
              <input
                type="text"
                placeholder="Entity B"
                value={entityB}
                onChange={(e) => setEntityB(e.target.value)}
                className="flex-1 border rounded p-2"
              />
            </div>
            <textarea
              placeholder="Analysis Query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <button
              onClick={handleCompare}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Compare Entities
            </button>
          </div>
  
          {analysisReady && analysisData && (
            <div className="space-y-6">
              <section className="bg-white rounded shadow p-6">
                <h3 className="text-xl font-semibold mb-2">📊 Executive Summary</h3>
                <p><strong>Overview:</strong> {analysisData.overview}</p>
                <p className="mt-2"><strong>Key Recommendation:</strong> {analysisData.recommendation}</p>
                <p className="mt-2"><strong>Overall Confidence:</strong> {analysisData.confidence}</p>
              </section>
  
              <section className="bg-white rounded shadow p-6">
                <h3 className="text-xl font-semibold mb-4">📋 Detailed Analysis Matrix</h3>
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2">Analysis Category</th>
                      <th className="border p-2">{entityA}</th>
                      <th className="border p-2">{entityB}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisData.matrix.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">{row.category}</td>
                        <td className="border p-2">{row.apple}</td>
                        <td className="border p-2">{row.meta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default HLCompareDashboard;