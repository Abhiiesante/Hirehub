import React, { useState } from "react";
import axios from "axios";
import { RESUME_API_END_POINT } from "@/utils/constant";
import Navbar from "./shared/Navbar";

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [jobRoles, setJobRoles] = useState([]);
    const [atsScore, setAtsScore] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(selectedFile.type)) {
            setFile(selectedFile);
            setError("");
        } else {
            setError("Only PDF or DOCX files are allowed.");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please upload a resume file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(RESUME_API_END_POINT, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("Response Data:", response.data); // Log response data
            setJobRoles(response.data.jobRoles);
            setAtsScore(response.data.atsScore);
        } catch (err) {
            console.error("Error processing the resume:", err); // Log error
            setError("Error processing the resume. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center"> {/* Background gradient */}
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"> {/* Card styling */}
                    <h2 className="text-2xl font-bold text-center text-gray-800">Resume Analyzer</h2> {/* Title styling */}
                    <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" /> {/* Input styling */}
                    {error && <p className="text-red-500">{error}</p>}
                    <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"> {/* Button styling */}
                        Upload & Analyze
                    </button>
                    {jobRoles.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800">Suggested Job Roles:</h3> {/* Suggested roles title */}
                            <ul className="list-disc pl-6 mt-2 text-gray-700"> {/* List styling */}
                                {jobRoles.map((role, index) => (
                                    <li key={index}>{role}</li> // Display each role in a list item
                                ))}
                            </ul>
                        </div>
                    )}
                    {atsScore !== null && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800">ATS Score:</h3> {/* ATS score title */}
                            <p className="text-gray-700">{atsScore}%</p> {/* Display ATS score */}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ResumeAnalyzer;