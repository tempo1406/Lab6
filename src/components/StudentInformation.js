import React from "react";
import { useLocation } from "react-router-dom";

function StudentInformation() {
    const location = useLocation();
    const { name, code} = location.state || {};

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto mt-10">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">Student Information</h1>
            </div>

            <p className="text-gray-700">Student Name: {name}</p>
            <p className="text-gray-700">Student Code: {code}</p>
        </div>
    );
}

export default StudentInformation;
