import { useEffect, useState } from "react";

function StudentList({
    setEditStudent,
    refresh,
    refreshStudents
}) {

    const [students, setStudents] = useState([]);


    // VIEW STUDENTS
    const loadStudents = async () => {

        const response = await fetch(
            "http://localhost:5000/students"
        );

        const data = await response.json();

        setStudents(data);
    };


    // LOAD STUDENTS
    useEffect(() => {

        loadStudents();

    }, [refresh]);


    // DELETE STUDENT
    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        // If Cancel is clicked
        if (!confirmDelete) {
            return;
        }


        // Delete student
        await fetch(
            `http://localhost:5000/students/${id}`,
            {
                method: "DELETE"
            }
        );


        // Refresh list
        refreshStudents();
    };


    return (
        <div>

            <h2>Student Records</h2>


            {students.map((student) => (

                <div
                    className="student"
                    key={student._id}
                >

                    <h3>{student.name}</h3>

                    <p>
                        Email: {student.email}
                    </p>

                    <p>
                        Course: {student.course}
                    </p>


                    <button
                        onClick={() =>
                            setEditStudent(student)
                        }
                    >
                        Edit
                    </button>


                    <button
                        onClick={() =>
                            deleteStudent(student._id)
                        }
                    >
                        Delete
                    </button>

                </div>

            ))}

        </div>
    );
}

export default StudentList;