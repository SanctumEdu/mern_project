const express = require("express");
const cors = require("cors");

require("./db");

const Student = require("./Student");

const app = express();

app.use(cors());
app.use(express.json());


// CREATE - Add Student
app.post("/students", async (req, res) => {

    const student = await Student.create(req.body);

    res.json(student);
});


// READ - View Students
app.get("/students", async (req, res) => {

    const students = await Student.find();

    res.json(students);
});


// UPDATE - Edit Student
app.put("/students/:id", async (req, res) => {

    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(student);
});


// DELETE - Delete Student
app.delete("/students/:id", async (req, res) => {

    await Student.findByIdAndDelete(req.params.id);

    res.json({
        message: "Student Deleted"
    });
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});