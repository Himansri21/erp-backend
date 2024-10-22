// backend/controllers/attendanceController.js
const db = require("../config/db");

const generateCode = (req, res) => {
  const { lectureId } = req.body;
  const code = `${req.user.userId}-${lectureId}-${Date.now()}`; // Unique code based on teacher ID, lecture ID, and timestamp

  res.status(200).json({ code });
};

const markAttendance = (req, res) => {
  const { code } = req.body;

  // Extract teacherId and lectureId from the code (split by '-')
  const [teacherId, lectureId, timestamp] = code.split("-");

  // Record attendance in the database
  const sql =
    "INSERT INTO attendance (student_id, teacher_id, lecture_id, date) VALUES (?, ?, ?, NOW())";
  db
    .promise()
    .execute(sql, [req.user.userId, teacherId, lectureId])
    .then(() =>
      res.status(200).json({ message: "Attendance marked successfully" })
    )
    .catch(err =>
      res.status(500).json({ message: "Server error", error: err })
    );
};

const getAttendanceReports = (req, res) => {
  const { subjectId } = req.query;

  // Fetch attendance for the subject from the DB
  const sql =
    "SELECT * FROM attendance WHERE teacher_id = ? AND subject_id = ?";
  db
    .promise()
    .execute(sql, [req.user.userId, subjectId])
    .then(([rows]) => res.status(200).json(rows))
    .catch(err =>
      res.status(500).json({ message: "Server error", error: err })
    );
};

module.exports = { generateCode, markAttendance, getAttendanceReports };
