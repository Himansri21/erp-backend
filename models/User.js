// backend/models/User.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const sql =
      "INSERT INTO users (name, email, password, role, class_id) VALUES (?, ?, ?, ?, ?)";
    const result = await db
      .promise()
      .execute(sql, [
        user.name,
        user.email,
        hashedPassword,
        user.role,
        user.class_id,
      ]);
    return result;
  }

  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [result] = await db.promise().execute(sql, [email]);
    return result[0];
  }

  static async findById(userId) {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [result] = await db.promise().execute(sql, [userId]);
    return result[0];
  }
}

module.exports = User;
