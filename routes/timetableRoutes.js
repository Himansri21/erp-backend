// backend/routes/timetableRoutes.js
const express = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  addTimetable,
  getTimetable,
} = require("../controllers/timetableController");
const router = express.Router();

// Only HODs can add timetables
router.post("/add", roleMiddleware("head"), addTimetable);

// Students and teachers can view their timetable
router.get("/view", getTimetable);

module.exports = router;
