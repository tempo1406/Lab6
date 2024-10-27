import React, { useState } from "react";

function EditStudentModal({ student, closeEditModal, updateStudentList }) {
    const [updatedStudent, setUpdatedStudent] = useState(student);

    const handleInputChange = (e) => {
        setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = () => {
        fetch(`https://student-api-nestjs.onrender.com/students/${student._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedStudent),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    updateStudentList(data.data);
                    closeEditModal();
                } else {
                    console.error("Failed to update student:", data);
                }
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Edit Student</h2>
                <input
                    type="text"
                    name="name"
                    value={updatedStudent.name}
                    onChange={handleInputChange}
                    className="border p-2 rounded mb-4 w-full"
                />
                <input
                    type="text"
                    name="studentCode"
                    value={updatedStudent.studentCode}
                    onChange={handleInputChange}
                    className="border p-2 rounded mb-4 w-full"
                />
                <div className="flex justify-end">
                    <button
                        onClick={closeEditModal}
                        className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveChanges}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditStudentModal;
