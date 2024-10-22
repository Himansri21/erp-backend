// backend/models/Attendance.js
const db = require("../config/db");

class Attendance {
  static async markAttendance(studentId, teacherId, lectureId) {
    const sql =
      "INSERT INTO attendance (student_id, teacher_id, lecture_id, date) VALUES (?, ?, ?, NOW())";
    const result = await db
      .promise()
      .execute(sql, [studentId, teacherId, lectureId]);
    return result;
  }

  static async getAttendanceByStudent(studentId) {
    const sql =
      "SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC";
    const [result] = await db.promise().execute(sql, [studentId]);
    return result;
  }

  static async getAttendanceReportByTeacher(teacherId) {
    const sql =
      "SELECT * FROM attendance WHERE teacher_id = ? ORDER BY date DESC";
    const [result] = await db.promise().execute(sql, [teacherId]);
    return result;
  }
}

module.exports = Attendance;
