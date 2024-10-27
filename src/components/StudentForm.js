import React from "react";

function StudentForm({ newStudent, setNewStudent, addOrUpdateStudent, editingStudent, closeEditModal }) {
    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
                {editingStudent ? "Edit Student" : "Add New Student"}
            </h2>
            <div className="flex">
                <input
                    type="text"
                    placeholder="Student Name"
                    value={newStudent.name}
                    onChange={(e) =>
                        setNewStudent({ ...newStudent, name: e.target.value })
                    }
                    className="border border-gray-300 p-2 rounded-l-md flex-grow focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Student Code"
                    value={newStudent.studentCode}
                    onChange={(e) =>
                        setNewStudent({ ...newStudent, studentCode: e.target.value })
                    }
                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mt-4 flex justify-between items-center ">
                <div>
                    <input
                        type="checkbox"
                        checked={newStudent.isActive}
                        onChange={(e) =>
                            setNewStudent({ ...newStudent, isActive: e.target.checked })
                        }
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300 rounded"
                    />
                    <span className="text-gray-700">Still Active</span>
                </div>
                
                <button
                    onClick={addOrUpdateStudent}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2"
                >
                    {editingStudent ? "Update" : "Add"}
                </button>
                {editingStudent && (
                    <button
                        onClick={closeEditModal}
                        className="ml-2 px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}

export default StudentForm;
