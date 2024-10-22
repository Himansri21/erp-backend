// backend/routes/materialRoutes.js
const express = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  uploadMaterial,
  getMaterials,
} = require("../controllers/materialController");
const router = express.Router();

// Teacher uploads material
router.post("/upload", roleMiddleware("teacher"), uploadMaterial);

// Students and teachers access materials by subject ID
router.get("/:subjectId", getMaterials);

module.exports = router;
