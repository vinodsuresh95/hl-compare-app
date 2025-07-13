import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const Documents = () => {
    const [files, setFiles] = useState([]);
    const [entityA, setEntityA] = useState("");
    const [entityB, setEntityB] = useState("");
    const [query, setQuery] = useState("Compare financial and strategic outlook");
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);


    const [matrix, setMatrix] = useState([
        {
            category: "ESG Factors",
            apple: {
                text: "Apple’s ESG progress includes...",
                confidence_score: 85,
                confidence_label: "High Confidence",
                source: "https://apple.com/esg"
            },
            meta: {
                text: "Meta’s ESG issues include...",
                confidence_score: 78,
                confidence_label: "Medium Confidence",
                source: "https://meta.com/sustainability"
            }
        }
    ]);

    // Optional: fetch matrix from API
    useEffect(() => {
        // Example: fetch from backend later
        // fetch("http://localhost:8000/api/compare")
        //   .then((res) => res.json())
        //   .then((data) => setMatrix(data.matrix));
    }, []);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async () => {
        if (files.length === 0 || !entityA || !entityB) {
            alert("Please fill in all fields and upload at least one file.");
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        formData.append("entity_a", entityA);
        formData.append("entity_b", entityB);
        formData.append("query", query);

        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/compare", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setSummary(data);
            setMatrix(data.matrix); // optional if returned
        } catch (error) {
            console.error("Error uploading files:", error);
            alert("Something went wrong. Check the console for details.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (!summary) {
            alert("Generate summary before downloading PDF.");
            return;
        }

        const payload = {
            summary,
            entityA,
            entityB,
            query,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/download-pdf", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to download PDF");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "comparison_summary.pdf";
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("PDF download failed", error);
            alert("PDF download failed. Check console for error details.");
        }
    };

    const renderEntityInfo = (entityData) => {
        if (!entityData || typeof entityData !== "object") return <p>No data</p>;
        const { text, confidence_score, confidence_label, source } = entityData;

        let badgeColor = "bg-gray-500";
        if (confidence_score >= 80) badgeColor = "bg-green-500";
        else if (confidence_score >= 70) badgeColor = "bg-yellow-500";
        else badgeColor = "bg-red-500";

        return (
            <div className="space-y-2">
                <p className="text-sm">{text}</p>
                <div className="text-xs flex space-x-2 items-center">
                    <span className={`text-white px-2 py-1 rounded ${badgeColor}`}>
                        {confidence_score}%
                    </span>
                    <span className="italic text-gray-600">{confidence_label}</span>
                </div>
                <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-xs"
                >
                    Source
                </a>
            </div>
        );
    };

    

    const handleSaveToReports = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/save-report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  entity_a: entityA,
                  entity_b: entityB,
                  summary: summary  // ✅ not summaryData
                })
              });
              
            const data = await response.json();
            alert("Saved to Reports! ID: " + data.report_id);
        } catch (error) {
            console.error("Error saving report:", error);
        }
    };


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                📁 Upload Research Document
            </h2>

            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />

            {files.length > 0 && (
                <ul className="list-disc text-sm mb-4 text-gray-600 ml-5">
                    {Array.from(files).map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                    ))}
                </ul>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Entity A (e.g. Apple)"
                    value={entityA}
                    onChange={(e) => setEntityA(e.target.value)}
                    className="p-3 border rounded-lg shadow-sm"
                />
                <input
                    type="text"
                    placeholder="Entity B (e.g. Meta)"
                    value={entityB}
                    onChange={(e) => setEntityB(e.target.value)}
                    className="p-3 border rounded-lg shadow-sm"
                />
            </div>

            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Custom comparison query"
                className="w-full p-3 mb-6 border rounded-lg shadow-sm"
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 font-semibold shadow-md hover:opacity-90 transition"
            >
                {loading ? "Analyzing..." : "🔍 Compare Entities"}
            </button>

            {summary && (
                <div className="mt-10 space-y-6">
                    <button
                        onClick={handleDownloadPDF}
                        className="rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 font-semibold shadow-md hover:opacity-90 transition"
                    >
                        📥 Download PDF Report
                    </button>
                    <button
                        onClick={handleSaveToReports}
                        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save to Reports
                    </button>


                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">📊 Executive Summary</h3>
                        <p><strong>Overview:</strong> {summary.overview}</p>
                        <p><strong>Key Recommendation:</strong> {summary.key_recommendation}</p>
                        <p><strong>Overall Confidence:</strong> {summary.confidence}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">📋 Detailed Analysis Matrix</h3>
                        <table className="w-full table-auto border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2 text-left">Analysis Category</th>
                                    <th className="border px-4 py-2 text-left">{entityA}</th>
                                    <th className="border px-4 py-2 text-left">{entityB}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matrix.map((row, idx) => (
                                    <tr key={idx} className="align-top">
                                        <td className="border px-4 py-2 font-bold">{row.category}</td>
                                        <td className="border px-4 py-2">{renderEntityInfo(row.apple)}</td>
                                        <td className="border px-4 py-2">{renderEntityInfo(row.meta)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Documents;
