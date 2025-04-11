import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";

const roadmaps = {
    "Software Engineer": [
        { step: 1, title: "Learn Programming", description: "Start with Python, Java, or JavaScript." },
        { step: 2, title: "Master Data Structures & Algorithms", description: "Solve coding problems on LeetCode, Codeforces." },
        { step: 3, title: "Build Projects", description: "Create real-world applications to showcase skills." },
        { step: 4, title: "Prepare for Interviews", description: "Practice system design and behavioral questions." },
        { step: 5, title: "Apply & Get Hired!", description: "Apply for jobs and ace the interviews." }
    ],

    "Data Scientist": [
        { step: 1, title: "Learn Python & SQL", description: "Get comfortable with data manipulation and queries." },
        { step: 2, title: "Study Machine Learning", description: "Understand algorithms like regression and decision trees." },
        { step: 3, title: "Work on Data Projects", description: "Use datasets to solve real problems." },
        { step: 4, title: "Master Statistics & Probability", description: "Essential for making data-driven decisions." },
        { step: 5, title: "Apply for Data Science Jobs", description: "Build a strong portfolio and network with recruiters." }
    ],

    "DevOps Engineer": [
        { step: 1, title: "Learn Linux & Bash Scripting", description: "Gain hands-on experience with server management." },
        { step: 2, title: "Master CI/CD Pipelines", description: "Automate workflows using Jenkins, GitHub Actions, and GitLab CI/CD." },
        { step: 3, title: "Understand Cloud Platforms", description: "Familiarize yourself with AWS, GCP, and Azure." },
        { step: 4, title: "Deploy and Monitor Applications", description: "Use Kubernetes and Docker for containerized deployments." },
        { step: 5, title: "Apply for DevOps Engineer Roles", description: "Showcase your experience in cloud infrastructure and automation." }
    ],

    "Cybersecurity Analyst": [
        { step: 1, title: "Learn Networking Fundamentals", description: "Understand TCP/IP, firewalls, and security protocols." },
        { step: 2, title: "Study Ethical Hacking", description: "Learn penetration testing and vulnerability analysis." },
        { step: 3, title: "Get Certified", description: "Earn certifications like CEH, CISSP, or CompTIA Security+." },
        { step: 4, title: "Monitor and Respond to Threats", description: "Gain experience with SIEM tools and security incident response." },
        { step: 5, title: "Apply for Cybersecurity Roles", description: "Look for job openings in IT security teams." }
    ],

    "Product Manager": [
        { step: 1, title: "Understand Business & Markets", description: "Develop analytical skills and market knowledge." },
        { step: 2, title: "Learn Agile & Scrum", description: "Manage product development cycles efficiently." },
        { step: 3, title: "Develop Communication & Leadership", description: "Work on stakeholder management and team leadership." },
        { step: 4, title: "Build a Product Portfolio", description: "Create case studies of successful product launches." },
        { step: 5, title: "Apply for PM Roles", description: "Network with hiring managers and showcase your skills." }
    ]
};

const RoadMap = () => {
    const [selectedJob, setSelectedJob] = useState("Software Engineer");

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center mt-16 p-6">
                <h1 className="text-4xl font-bold text-blue-400 mb-6">Career Roadmap</h1>

                {/* Job Filters */}
                <div className="flex flex-wrap gap-4 mb-6 justify-center">
                    {Object.keys(roadmaps).map((job) => (
                        <button
                            key={job}
                            className={`px-4 py-2 rounded-md transition-all ${selectedJob === job ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
                                }`}
                            onClick={() => setSelectedJob(job)}
                        >
                            {job}
                        </button>
                    ))}
                </div>

                {/* Roadmap Steps */}
                <div className="relative w-full max-w-lg">
                    <div className="absolute left-5 w-1 bg-blue-500 h-full"></div>

                    {roadmaps[selectedJob].map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative flex items-center mb-6"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                {step.step}
                            </div>
                            <div className="ml-6 p-4 bg-gray-800 rounded-lg shadow-lg w-full">
                                <h2 className="text-xl font-semibold">{step.title}</h2>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RoadMap;