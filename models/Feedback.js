// backend/models/Feedback.js
const db = require("../config/db");

class Feedback {
  static async submitFeedback(studentId, targetRole, targetId, message) {
    const sql =
      "INSERT INTO feedback (student_id, target_role, target_id, message) VALUES (?, ?, ?, ?)";
    const result = await db
      .promise()
      .execute(sql, [studentId, targetRole, targetId, message]);
    return result;
  }

  static async getFeedbackByTarget(role, targetId) {
    const sql =
      "SELECT * FROM feedback WHERE target_role = ? AND target_id = ? ORDER BY created_at DESC";
    const [result] = await db.promise().execute(sql, [role, targetId]);
    return result;
  }
}

module.exports = Feedback;
