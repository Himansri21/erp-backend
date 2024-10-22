// backend/routes/feedbackRoutes.js
const express = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  submitFeedback,
  getFeedback,
} = require("../controllers/feedbackController");
const router = express.Router();

// Students submit feedback
router.post("/submit", roleMiddleware("student"), submitFeedback);

// Teachers and HOD view feedback intended for them
router.get("/", roleMiddleware("teacher"), getFeedback); // Same route for teacher and HOD

module.exports = router;
