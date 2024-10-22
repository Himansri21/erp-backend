// backend/routes/noticeRoutes.js
const express = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const { createNotice, getNotices } = require("../controllers/noticeController");
const router = express.Router();

// HOD creates notices
router.post("/create", roleMiddleware("head"), createNotice);

// Students and teachers view relevant notices
router.get("/", getNotices);

module.exports = router;
