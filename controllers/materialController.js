// backend/controllers/materialController.js
const multer = require("multer");
const db = require("../config/db");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");

// Upload material (Teacher only)
const uploadMaterial = (req, res) => {
  upload(req, res, err => {
    if (err) return res.status(500).json({ message: "File upload error" });

    const { subjectId, description } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    // Save material information to the database
    const sql =
      "INSERT INTO materials (teacher_id, subject_id, file_url, description) VALUES (?, ?, ?, ?)";
    db
      .promise()
      .execute(sql, [req.user.userId, subjectId, fileUrl, description])
      .then(() =>
        res.status(201).json({ message: "Material uploaded successfully" })
      )
      .catch(err =>
        res.status(500).json({ message: "Server error", error: err })
      );
  });
};

// Get materials for a subject (Students and Teachers)
const getMaterials = (req, res) => {
  const { subjectId } = req.params;
  const sql = "SELECT * FROM materials WHERE subject_id = ?";

  db
    .promise()
    .execute(sql, [subjectId])
    .then(([rows]) => res.status(200).json(rows))
    .catch(err =>
      res.status(500).json({ message: "Server error", error: err })
    );
};

module.exports = { uploadMaterial, getMaterials };
