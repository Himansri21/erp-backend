// backend/middleware/roleMiddleware.js

const jwt = require("jsonwebtoken");

// Middleware to check if user has a specific role
const roleMiddleware = requiredRole => (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if the role in the token matches the required role
    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access denied. You do not have the required role." });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = roleMiddleware;
