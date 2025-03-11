const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/db");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.route");
const profileRoutes = require("./routes/profile.route");
const onboardingRoutes = require("./routes/onboardingRoutes");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/user", userRoutes);
app.use("/api/user/profile", profileRoutes);
app.use("/api/onboarding", onboardingRoutes);

connectToDb();

module.exports = app;
