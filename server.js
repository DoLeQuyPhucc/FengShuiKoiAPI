const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const http = require("http");
dotenv.config();

const app = express();

const server = http.createServer(app);

// Socket.io
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket Connection
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Nhận tin nhắn từ client
  socket.on("sendMessage", (messageData) => {
    // Lưu message vào database nếu cần
    console.log(messageData);
    // Phát lại message cho các client khác
    io.emit("receiveMessage", messageData);
  });

  // Ngắt kết nối
  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

// Tắt CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware xử lý JSON
app.use(express.json());

// Import routes
app.use("/api/auth", require("./routes/authRoutes"));

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
