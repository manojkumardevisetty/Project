const asyncHandler = require('express-async-handler');
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require('./students-service');

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const filters = {
        name: req.query.name,
        className: req.query.className,
        section: req.query.section,
        roll: req.query.roll
    };

    const students = await getAllStudents(filters);
    res.status(200).json({
        status: true,
        data: students
    });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const studentData = req.body;
    const result = await addNewStudent(studentData);

    res.status(201).json({
        status: true,
        message: result.message
    });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const studentData = {
        ...req.body,
        userId: studentId
    };
    console.log(studentData);
    const result = await updateStudent(studentData);

    res.status(200).json({
        status: true,
        message: result
    });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const student = await getStudentDetail(studentId);

    res.status(200).json({
        status: true,
        data: student
    });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const payload = {
        userId: req.params.id,
        reviewerId: req.user.id,
        status: req.body.status
    };

    const result = await setStudentStatus(payload);

    res.status(200).json({
        status: true,
        message: result.message
    });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent
};
