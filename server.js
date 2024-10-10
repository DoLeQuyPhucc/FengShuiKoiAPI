const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const http = require("http");
const Message = require("./models/Message");
dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Nhận tin nhắn từ client
  socket.on("sendMessage", async (messageData) => {
    const { sender, receiver, message } = messageData;

    // Lưu tin nhắn vào MongoDB
    const newMessage = new Message({
      sender,
      receiver,
      message,
    });

    try {
      await newMessage.save();
      console.log("Message saved:", messageData);

      // Phát lại message cho các client khác
      io.emit("receiveMessage", messageData);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Ngắt kết nối
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// CORS headers
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
app.use("/api/blog", require("./routes/blogRoutes"));
app.use("/api/consultation", require("./routes/consultationRoutes"));

// Khởi động server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
