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
app.use(express.json());
app.use(cookieParser());

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173", // Development Frontend URL
  process.env.CLIENT_URL, // Production Frontend URL from .env
];

// Configure CORS dynamically

app.use(
  cors({origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true})
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
