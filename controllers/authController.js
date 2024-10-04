const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Danh sách lưu trữ refresh token tạm thời (có thể lưu vào DB)
let refreshTokens = [];

// Đăng nhập
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Tạo accessToken
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Tạo refreshToken
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET
    );
    refreshTokens.push(refreshToken); // Lưu lại refreshToken

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Đăng ký
exports.register = async (req, res) => {
  const { name, email, password, birthYear, gender } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      birthYear,
      gender,
      role: "user",
    });

    await newUser.save();

    const accessToken = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.REFRESH_TOKEN_SECRET
    );
    refreshTokens.push(refreshToken); // Lưu lại refreshToken

    res.json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Refresh Token
exports.refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is no longer valid" });

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      accessToken: newAccessToken,
    });
  });
};

// Đăng xuất (xóa refreshToken)
exports.logout = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token); // Xóa refreshToken
  res.json({ message: "Logged out successfully" });
};
