// backend/controllers/feedbackController.js
const db = require("../config/db");

// Submit feedback (Students only)
const submitFeedback = (req, res) => {
  const { targetRole, targetId, message } = req.body;

  const sql =
    "INSERT INTO feedback (student_id, target_role, target_id, message) VALUES (?, ?, ?, ?)";
  db
    .promise()
    .execute(sql, [req.user.userId, targetRole, targetId, message])
    .then(() =>
      res.status(201).json({ message: "Feedback submitted successfully" })
    )
    .catch(err =>
      res.status(500).json({ message: "Server error", error: err })
    );
};

// View feedback (Teachers/HOD only)
const getFeedback = (req, res) => {
  const { role, userId } = req.user;

  const sql =
    "SELECT * FROM feedback WHERE target_role = ? AND target_id = ? ORDER BY created_at DESC";
  db
    .promise()
    .execute(sql, [role, userId])
    .then(([rows]) => res.status(200).json(rows))
    .catch(err =>
      res.status(500).json({ message: "Server error", error: err })
    );
};

module.exports = { submitFeedback, getFeedback };
