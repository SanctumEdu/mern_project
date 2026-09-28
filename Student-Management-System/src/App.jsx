import { useState } from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";

function App() {

    const [editStudent, setEditStudent] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const refreshStudents = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="container">

            <h1>Student Management System</h1>

            <StudentForm
                editStudent={editStudent}
                setEditStudent={setEditStudent}
                refreshStudents={refreshStudents}
            />

            <StudentList
                setEditStudent={setEditStudent}
                refresh={refresh}
                refreshStudents={refreshStudents}
            />

        </div>
    );
}

export default App;