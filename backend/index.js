const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const jobRoutes = require("./routes/jobRoutes.js");
const errorHandler = require("./middleware/errorHandler.js");

dotenv.config();
connectDB();

const app = express();
// app.use(express.json());
// app.use(cookieParser());
// const allowedOrigins = [
//   "https://hire-hub-lwwa.vercel.app", // Frontend URL
//   "https://hire-hub-zeta-eight.vercel.app" // Backend URL
// ];

app.use(
  cors({
    origin: "*",
    credentials: true, // Ensure credentials are allowed
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    // allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    // exposedHeaders: ["Set-Cookie"] // Expose Set-Cookie header
  })
);

app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
