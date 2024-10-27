import React from "react";
import StudentRow from "./StudentRow";

function StudentTable({ students, deleteStudent, updateSelectedCount, openEditModal }) {
    return (
        <div className="w-full max-w-4xl mx-auto mt-4">
            <table className="w-full bg-gray-100 rounded-lg shadow-md overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="p-3">Select</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Student Code</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <StudentRow
                                key={student._id}
                                student={student}
                                deleteStudent={deleteStudent}
                                updateSelectedCount={updateSelectedCount}
                                openEditModal={openEditModal}
                            />
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="5"
                                className="p-5 text-center text-gray-500"
                            >
                                No students available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default StudentTable;
