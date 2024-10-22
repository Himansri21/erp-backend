// backend/models/Notice.js
const db = require("../config/db");

class Notice {
  static async createNotice(title, message, role) {
    const sql = "INSERT INTO notices (title, message, role) VALUES (?, ?, ?)";
    const result = await db.promise().execute(sql, [title, message, role]);
    return result;
  }

  static async getNoticesByRole(role) {
    const sql =
      'SELECT * FROM notices WHERE role = ? OR role = "all" ORDER BY created_at DESC';
    const [result] = await db.promise().execute(sql, [role]);
    return result;
  }
}

module.exports = Notice;
