const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const passport = require("passport");

const connectDB = require("./config/db");
const redisClient = require("./config/redis");

// Passport strategy (side-effect import)
require("./config/passport");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// ─────────────────────────────
// Global Middlewares
// ─────────────────────────────
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(helmet());
app.use(passport.initialize());

// ─────────────────────────────
// Bootstrap function (NO top-level await)
// ─────────────────────────────
const startServer = async () => {
  try {
    await connectDB();

    await redisClient.set("test", "connected");
    console.log("Redis connected");

    app.get("/", (req, res) => {
      res.send("Healthcare Backend is running!");
    });

    app.use("/auth", authRoutes);
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/profiles", profileRoutes);


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
};

startServer();
