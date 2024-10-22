// backend/routes/attendanceRoutes.js
const express = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  generateCode,
  markAttendance,
  getAttendanceReports,
} = require("../controllers/attendanceController");
const router = express.Router();

// Teacher can generate attendance code
router.post("/generate", roleMiddleware("teacher"), generateCode);

// Student can mark attendance
router.post("/mark", roleMiddleware("student"), markAttendance);

// Teacher can view attendance reports
router.get("/reports", roleMiddleware("teacher"), getAttendanceReports);

module.exports = router;
