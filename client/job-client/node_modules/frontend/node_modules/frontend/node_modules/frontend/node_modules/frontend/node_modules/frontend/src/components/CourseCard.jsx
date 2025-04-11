import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const CourseCard = ({ course }) => {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <img src={course.thumbnail} alt={course.title} className="rounded" />
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="text-gray-400">{course.instructor}</p>
            <p className="text-green-400">{course.price}</p>
            <button onClick={() => setShowVideo(true)} className="bg-blue-500 px-4 py-2 mt-2">Watch Now</button>
            {showVideo && <VideoPlayer videoUrl={course.videoUrl} onClose={() => setShowVideo(false)} />}
        </div>
    );
};

export default CourseCard;
