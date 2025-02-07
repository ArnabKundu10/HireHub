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
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.options('*', cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies

// Routes
app.get("/",(req,res)=>{
  res.status(201).json("Server is okay");
})
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
// Error Handling Middleware
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
