// backend/controllers/noticeController.js
const db = require("../config/db");

// Create Notice (HOD only)
const createNotice = (req, res) => {
  const { title, message, role } = req.body; // Role can be 'student', 'teacher', or 'all'

  const sql = "INSERT INTO notices (title, message, role) VALUES (?, ?, ?)";
  db
    .promise()
    .execute(sql, [title, message, role])
    .then(() =>
      res.status(201).json({ message: "Notice created successfully" })
    )
    .catch(err =>
      res.status(500).json({ message: "Server error", error: err })
    );
};

// Get Notices for a specific role (Students and Teachers)
const getNotices = (req, res) => {
  const role = req.user.role;

  const sql =
    'SELECT * FROM notices WHERE role = ? OR role = "all" ORDER BY created_at DESC';
  db
    .promise()
    .execute(sql, [role])
    .then(([rows]) => res.status(200).json(rows))
    .catch(err =>
      res.status(500).json({ message: "Server error", error: err })
    );
};

module.exports = { createNotice, getNotices };
