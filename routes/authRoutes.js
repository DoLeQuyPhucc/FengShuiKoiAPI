const express = require("express");
const router = express.Router();
const {
  login,
  register,
  refreshToken,
  logout,
} = require("../controllers/authController");

// Route login
router.post("/login", login);

// Route register
router.post("/register", register);

// Route refresh token
router.post("/refresh-token", refreshToken);

// Route logout
router.post("/logout", logout);

module.exports = router;
