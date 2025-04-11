import React from "react";

const Filters = ({ setFilters }) => {
    return (
        <div className="flex justify-center gap-4 p-4">
            <select onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}>
                <option value="">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="AI">AI</option>
            </select>
            <select onChange={(e) => setFilters((prev) => ({ ...prev, level: e.target.value }))}>
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Advanced">Advanced</option>
            </select>
        </div>
    );
};

export default Filters;
