// backend/models/Material.js
const db = require("../config/db");

class Material {
  static async uploadMaterial(teacherId, subjectId, fileUrl, description) {
    const sql =
      "INSERT INTO materials (teacher_id, subject_id, file_url, description) VALUES (?, ?, ?, ?)";
    const result = await db
      .promise()
      .execute(sql, [teacherId, subjectId, fileUrl, description]);
    return result;
  }

  static async getMaterialsBySubject(subjectId) {
    const sql = "SELECT * FROM materials WHERE subject_id = ?";
    const [result] = await db.promise().execute(sql, [subjectId]);
    return result;
  }
}

module.exports = Material;
