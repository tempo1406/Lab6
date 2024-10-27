import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

function StudentManager() {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        name: "",
        studentCode: "",
        isActive: false,
    });

    const [selectedCount, setSelectedCount] = useState(0);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const openEditModal = (student) => {
        setNewStudent(student);
        setEditingStudent(student);
        setIsModalOpen(true); // Open modal
    };

    const closeEditModal = () => {
        setNewStudent({
            name: "",
            studentCode: "",
            isActive: false,
        });
        setEditingStudent(null);
        setIsModalOpen(false); 
    };

    useEffect(() => {
        fetch("https://student-api-nestjs.onrender.com/students")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.data)) {
                    setStudents(data.data);
                } else {
                    console.error("Data structure is unexpected:", data);
                }
            });
    }, []);

    const addOrUpdateStudent = () => {
        if (editingStudent) {
            updateStudent();
        } else {
            addStudent();
        }
    };

    const addStudent = () => {
        if (newStudent.name && newStudent.studentCode) {
            fetch("https://student-api-nestjs.onrender.com/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newStudent),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setStudents((prevStudents) => [
                            data.data,
                            ...prevStudents,
                        ]);
                        closeEditModal();
                    } else {
                        console.error("Failed to add student:", data);
                    }
                });
        }
    };

    const updateStudent = () => {
        fetch(
            `https://student-api-nestjs.onrender.com/students/${editingStudent._id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newStudent),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setStudents((prevStudents) =>
                        prevStudents.map((student) =>
                            student._id === editingStudent._id
                                ? data.data
                                : student
                        )
                    );
                    closeEditModal();
                } else {
                    console.error("Failed to update student:", data);
                }
            });
    };

    const deleteStudent = (studentId) => {
        fetch(`https://student-api-nestjs.onrender.com/students/${studentId}`, {
            method: "DELETE",
        }).then((response) => {
            if (response.ok) {
                setStudents((prevStudents) =>
                    prevStudents.filter((student) => student._id !== studentId)
                );
            } else {
                console.error("Failed to delete student:", response.status);
            }
        });
    };

    const updateSelectedCount = (e) => {
        setSelectedCount(
            e.target.checked ? selectedCount + 1 : selectedCount - 1
        );
    };

    const clearStudents = () => {
        setStudents([]);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-700">
                        Total Students: {selectedCount}
                    </h2>
                    <button
                        onClick={clearStudents}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Clear
                    </button>
                </div>

                <StudentForm
                    newStudent={newStudent}
                    setNewStudent={setNewStudent}
                    addOrUpdateStudent={addOrUpdateStudent}
                    editingStudent={editingStudent}
                    closeEditModal={closeEditModal}
                />
                <StudentTable
                    students={students}
                    updateSelectedCount={updateSelectedCount}
                    deleteStudent={deleteStudent}
                    openEditModal={openEditModal}
                />
                
            </div>
        </div>
    );
}

export default StudentManager;
