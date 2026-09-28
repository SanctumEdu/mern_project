import { useEffect, useState } from "react";

function StudentForm({
    editStudent,
    setEditStudent,
    refreshStudents
}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");


    // Edit student ka data form mein load karein
    useEffect(() => {

        if (editStudent) {

            setName(editStudent.name);
            setEmail(editStudent.email);
            setCourse(editStudent.course);

        }

    }, [editStudent]);


    const saveStudent = async () => {

        const studentData = {
            name,
            email,
            course
        };


        // UPDATE
        if (editStudent) {

            await fetch(
                `http://localhost:5000/students/${editStudent._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(studentData)
                }
            );

            setEditStudent(null);

        }

        // CREATE
        else {

            await fetch(
                "http://localhost:5000/students",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(studentData)
                }
            );

        }


        setName("");
        setEmail("");
        setCourse("");

        refreshStudents();
    };


    const cancelEdit = () => {

        setEditStudent(null);

        setName("");
        setEmail("");
        setCourse("");
    };


    return (
        <div className="form">

            <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="text"
                placeholder="Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
            />


            <button onClick={saveStudent}>

                {editStudent
                    ? "Update Student"
                    : "Add Student"}

            </button>


            {editStudent && (

                <button onClick={cancelEdit}>
                    Cancel
                </button>

            )}

        </div>
    );
}

export default StudentForm;