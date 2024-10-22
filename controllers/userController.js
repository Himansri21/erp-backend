// backend/controllers/userController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

const getUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  db
    .promise()
    .execute(sql)
    .then(([rows]) => res.status(200).json(rows))
    .catch(err =>
      res.status(500).json({ message: "Server error", error: err })
    );
};

const addUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  const hashedPassword = await bcrypt.hash(password || "default_password", 10);

  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db
    .promise()
    .execute(sql, [name, email, hashedPassword, role])
    .then(() => res.status(201).json({ message: "User added successfully" }))
    .catch(err =>
      res.status(500).json({ message: "Server error", error: err })
    );
};

module.exports = { getUsers, addUser };
