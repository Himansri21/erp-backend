// backend/routes/userRoutes.js
const express = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getUsers, addUser } = require("../controllers/userController");
const router = express.Router();

// Fetch all users (HOD only)
router.get("/", roleMiddleware("head"), getUsers);

// Add new user (HOD only)
router.post("/add", roleMiddleware("head"), addUser);

module.exports = router;
