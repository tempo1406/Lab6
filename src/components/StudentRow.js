import React from "react";
import { Link } from "react-router-dom";

function StudentRow({ student, deleteStudent, updateSelectedCount, openEditModal }) {
    return (
        <tr className="text-center bg-white hover:bg-gray-50 transition">
            <td className="p-3">
                <input
                    type="checkbox"
                    onChange={(e) => updateSelectedCount(e)}
                    className="h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300 rounded"
                />
            </td>
            <td className="p-3">
                <Link
                    to="/student"
                    state={{ name: student.name, code: student.studentCode }}
                    className="hover:cursor-pointer"
                >
                    {student.name}
                </Link>
            </td>
            <td className="p-3">{student.studentCode}</td>
            <td className="p-3">
                <span
                    className={
                        student.isActive
                            ? "bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
                            : "bg-red-100 text-red-600 px-3 py-1 rounded-full"
                    }
                >
                    {student.isActive ? "Active" : "Inactive"}
                </span>
            </td>
            <td className="p-3">
                <button
                    onClick={() => openEditModal(student)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2"
                >
                    Edit
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteStudent(student._id);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default StudentRow;
