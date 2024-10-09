const express = require("express");
const router = express.Router();
const {
  login,
  register,
  refreshToken,
  logout,
  me,
} = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

// Route login
router.post("/login", login);

// Route register
router.post("/register", register);

// Route refresh token
router.post("/refresh-token", refreshToken);

// Route logout
router.post("/logout", logout);

// Route get user info
router.get("/me", verifyToken, checkRole(["user"]), me);

module.exports = router;
