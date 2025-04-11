import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import VideoPlayer from "./VideoPlayer";

// Extended course data with additional cards
const coursesData = [
    {
        title: "Full Stack Development",
        platform: "Udemy",
        type: "Online",
        price: "₹5000",
        category: "Development",
        paid: true,
        rating: 4.5,
        skills: ["HTML", "CSS", "JS", "Node.js"],
        thumbnail: "https://img-c.udemycdn.com/course/240x135/1565838_e54e_18.jpg",
        video: "https://www.youtube.com/embed/9zUHg7xjIqQ" // Full Stack Development Course Preview
    },
    {
        title: "Machine Learning",
        platform: "Coursera",
        type: "Online",
        price: "₹7000",
        category: "AI/ML",
        paid: true,
        rating: 4.7,
        skills: ["Python", "ML", "AI"],
        thumbnail: "https://i.ytimg.com/vi/GwIo3gDZCVQ/maxresdefault.jpg",
        video: "https://www.youtube.com/embed/GwIo3gDZCVQ" // Machine Learning Course Preview
    },
    {
        title: "React for Beginners",
        platform: "Udemy",
        type: "Online",
        price: "Free",
        category: "Development",
        paid: false,
        rating: 4.2,
        skills: ["React", "JavaScript"],
        thumbnail: "https://i.ytimg.com/vi/Ke90Tje7VS0/maxresdefault.jpg",
        video: "https://www.youtube.com/embed/Ke90Tje7VS0" // React for Beginners Course Preview
    },
    {
        title: "JavaScript Mastery",
        platform: "Udemy",
        type: "Online",
        price: "₹4000",
        category: "Development",
        paid: true,
        rating: 4.6,
        skills: ["JavaScript", "ES6"],
        thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
        video: "https://www.youtube.com/embed/PkZNo7MFNFg" // JavaScript Mastery Course Preview
    },
    {
        title: "Introduction to Data Science",
        platform: "Coursera",
        type: "Online",
        price: "₹6000",
        category: "Data Science",
        paid: true,
        rating: 4.4,
        skills: ["Python", "Pandas", "Data Science"],
        thumbnail: "https://i.ytimg.com/vi/ua-CiDNNj30/maxresdefault.jpg",
        video: "https://www.youtube.com/embed/ua-CiDNNj30" // Introduction to Data Science Course Preview
    },
    {
        title: "Advanced Machine Learning",
        platform: "edX",
        type: "Online",
        price: "₹10000",
        category: "AI/ML",
        paid: true,
        rating: 4.9,
        skills: ["Python", "TensorFlow", "Machine Learning"],
        thumbnail: "https://i.ytimg.com/vi/ArPaAX_PhIs/maxresdefault.jpg",
        video: "https://www.youtube.com/embed/ArPaAX_PhIs" // Advanced Machine Learning Course Preview
    },
    {
        title: "SQL for Data Science",
        platform: "edX",
        type: "Online",
        price: "₹3000",
        category: "Data Science",
        paid: true,
        rating: 4.1,
        skills: ["SQL", "Database Management"],
        thumbnail: "https://i.ytimg.com/vi/27axs9dO7AE/maxresdefault.jpg",
        video: "https://www.youtube.com/embed/27axs9dO7AE" // SQL for Data Science Course Preview
    },
    {
        title: "AWS Cloud Practitioner",
        platform: "AWS",
        type: "Online",
        price: "Free",
        category: "Cloud Computing",
        paid: false,
        rating: 4.8,
        skills: ["AWS", "Cloud"],
        thumbnail: "https://i.ytimg.com/vi/3hLmDS179YE/maxresdefault.jpg",
        video: "https://www.youtube.com/embed/3hLmDS179YE" // AWS Cloud Practitioner Course Preview
    },
    {
        title: "Google Cloud Essentials",
        platform: "Google Cloud",
        type: "Online",
        price: "₹5000",
        category: "Cloud Computing",
        paid: true,
        rating: 4.9,
        skills: ["GCP", "Cloud"],
        thumbnail: "https://i.ytimg.com/vi/QwQuro7ekvc/maxresdefault.jpg",
        video: "https://www.youtube.com/embed/QwQuro7ekvc" // Google Cloud Essentials Course Preview
    },
    {
        title: "Kubernetes for Beginners",
        platform: "Udemy",
        type: "Online",
        price: "₹7000",
        category: "DevOps",
        paid: true,
        rating: 4.5,
        skills: ["Kubernetes", "Docker"],
        thumbnail: "https://i.ytimg.com/vi/s_o8dwzRlu4/maxresdefault.jpg",
        video: "https://www.youtube.com/embed/s_o8dwzRlu4" // Kubernetes for Beginners Course Preview
    }
];


const CoursesPage = () => {
    // State for filters, sorting, and video modal
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        platforms: [],
        price: [],
        skills: []
    });
    const [sortOption, setSortOption] = useState("rating");
    const [activeVideo, setActiveVideo] = useState(null);

    // Handler for updating filters
    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (newFilters[filterType].includes(value)) {
                newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
            } else {
                newFilters[filterType].push(value);
            }
            return newFilters;
        });
    };

    // Handler for sorting
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // Filtered and sorted courses
    const filteredCourses = coursesData.filter(course => {
        const categoryMatch = selectedFilters.categories.length === 0 || selectedFilters.categories.includes(course.category);
        const platformMatch = selectedFilters.platforms.length === 0 || selectedFilters.platforms.includes(course.platform);
        const priceMatch = selectedFilters.price.length === 0 || selectedFilters.price.includes(course.price === "Free" ? "Free" : "Paid");
        const skillsMatch = selectedFilters.skills.length === 0 || selectedFilters.skills.some(skill => course.skills.includes(skill));
        return categoryMatch && platformMatch && priceMatch && skillsMatch;
    });

    const sortedCourses = [...filteredCourses].sort((a, b) => {
        if (sortOption === "rating") {
            return b.rating - a.rating;
        } else if (sortOption === "price") {
            // For free courses, treat price as 0
            const priceA = a.price === "Free" ? 0 : parseInt(a.price.replace("₹", ""));
            const priceB = b.price === "Free" ? 0 : parseInt(b.price.replace("₹", ""));
            return priceA - priceB;
        }
        return 0;
    });

    return (
        <>
            <Navbar />
            <div className="flex bg-[#0c0f19] min-h-screen mt-10 text-white p-6">
                {/* Filters Section */}
                <aside className="w-1/4 p-4 bg-[#15182b] rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    <div>
                        <label className="block text-sm mb-2">Category</label>
                        <div className="space-y-2">
                            {["Development", "Data Science", "AI/ML"].map((category) => (
                                <div key={category}>
                                    <input
                                        type="checkbox"
                                        id={category}
                                        className="mr-2"
                                        onChange={() => handleFilterChange("categories", category)}
                                    />
                                    <label htmlFor={category}>{category}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm mb-2">Platform</label>
                        <div className="space-y-2">
                            {["Udemy", "Coursera", "edX"].map((platform) => (
                                <div key={platform}>
                                    <input
                                        type="checkbox"
                                        id={platform}
                                        className="mr-2"
                                        onChange={() => handleFilterChange("platforms", platform)}
                                    />
                                    <label htmlFor={platform}>{platform}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm mb-2">Price</label>
                        <div className="space-y-2">
                            <div>
                                <input
                                    type="checkbox"
                                    id="free"
                                    className="mr-2"
                                    onChange={() => handleFilterChange("price", "Free")}
                                />
                                <label htmlFor="free">Free</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="paid"
                                    className="mr-2"
                                    onChange={() => handleFilterChange("price", "Paid")}
                                />
                                <label htmlFor="paid">Paid</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm mb-2">Skills</label>
                        <div className="space-y-2">
                            {["HTML", "CSS", "JS", "React", "Node.js", "Python", "ML", "Java", "SQL"].map((skill) => (
                                <div key={skill}>
                                    <input
                                        type="checkbox"
                                        id={skill}
                                        className="mr-2"
                                        onChange={() => handleFilterChange("skills", skill)}
                                    />
                                    <label htmlFor={skill}>{skill}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Courses Section */}
                <main className="w-3/4 p-6">
                    {/* Sort Option */}
                    <div className="mb-4">
                        <label htmlFor="sort" className="text-sm mr-2">Sort by</label>
                        <select
                            id="sort"
                            className="bg-[#1f2937] text-white px-4 py-2 rounded"
                            onChange={handleSortChange}
                            value={sortOption}
                        >
                            <option value="rating">Rating</option>
                            <option value="price">Price</option>
                        </select>
                    </div>

                    {/* Course Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedCourses.map((course, index) => (
                            <div key={index} className="bg-[#15182b] p-4 rounded-lg shadow-md">
                                <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded-lg" />
                                <h3 className="text-lg font-semibold mt-4">{course.title}</h3>
                                <p className="text-sm text-gray-400">{course.platform}</p>
                                <span className="block mt-2 text-sm bg-purple-600 py-1 px-2 rounded-full w-fit">
                                    {course.type}
                                </span>
                                <p className="mt-2 font-bold">{course.price}</p>

                                {/* Rating */}
                                <div className="mt-2 text-yellow-400">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i} className={`star ${i < Math.floor(course.rating) ? "filled" : ""}`}>★</span>
                                    ))}
                                    <span className="text-gray-400 ml-2">({course.rating})</span>
                                </div>

                                {/* Play Video Button */}
                                <button
                                    className="mt-3 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                    onClick={() => setActiveVideo(course.video)}
                                >
                                    Play Video
                                </button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Video Player Modal */}
            {activeVideo && (
                <VideoPlayer
                    videoUrl={activeVideo}
                    onClose={() => setActiveVideo(null)}
                />
            )}
        </>
    );
};

export default CoursesPage;
