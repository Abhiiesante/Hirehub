import React, { useEffect, useState } from "react";

const convertToEmbedUrl = (url) => {
    if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    }
    return url.includes("embed") ? url : `${url}?enablejsapi=1`;
};

const VideoPlayer = ({ videoUrl, onClose }) => {
    const [status, setStatus] = useState("Not Started");

    useEffect(() => {
        let player;

        const onYouTubeIframeAPIReady = () => {
            player = new window.YT.Player("youtube-player", {
                events: {
                    onStateChange: (event) => {
                        if (event.data === 1) {
                            setStatus("Started"); // Video started playing
                        } else if (event.data === 0) {
                            setStatus("Completed"); // Video finished
                        }
                    },
                },
            });
        };

        // Load YouTube API script if not already present
        if (!window.YT) {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => {
                window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
            };
        } else {
            onYouTubeIframeAPIReady();
        }

        return () => {
            player = null;
        };
    }, [videoUrl]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-gray-900 p-4 rounded-lg relative w-11/12 sm:w-3/4 md:w-1/2">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white bg-red-500 px-3 py-1 rounded"
                >
                    Close
                </button>
                <iframe
                    id="youtube-player"
                    width="100%"
                    height="400"
                    src={convertToEmbedUrl(videoUrl)}
                    title="Course Video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="rounded"
                ></iframe>
                <p className="text-white mt-3 text-center">Status: {status}</p>
            </div>
        </div>
    );
};

export default VideoPlayer;
