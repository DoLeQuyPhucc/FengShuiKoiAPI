const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

// Route login
router.post("/login", login);

// Route register
router.post('/register', register);

module.exports = router;
