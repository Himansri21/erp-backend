// backend/controllers/timetableController.js
const db = require("../config/db");

// Add timetable (HOD only)
const addTimetable = (req, res) => {
  const { teacherId, subject, timeSlot, classId } = req.body;

  const sql =
    "INSERT INTO timetable (teacher_id, subject, time_slot, class_id) VALUES (?, ?, ?, ?)";
  db
    .promise()
    .execute(sql, [teacherId, subject, timeSlot, classId])
    .then(() =>
      res.status(201).json({ message: "Timetable added successfully" })
    )
    .catch(err =>
      res.status(500).json({ message: "Server error", error: err })
    );
};

// View timetable (students and teachers)
const getTimetable = (req, res) => {
  const userId = req.user.userId;
  const role = req.user.role;

  let sql;
  if (role === "student") {
    sql =
      "SELECT * FROM timetable WHERE class_id = (SELECT class_id FROM users WHERE id = ?)";
  } else if (role === "teacher") {
    sql = "SELECT * FROM timetable WHERE teacher_id = ?";
  }

  db
    .promise()
    .execute(sql, [userId])
    .then(([rows]) => res.status(200).json(rows))
    .catch(err =>
      res.status(500).json({ message: "Server error", error: err })
    );
};

module.exports = { addTimetable, getTimetable };
