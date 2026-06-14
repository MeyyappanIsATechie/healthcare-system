const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");

const connectDB = require("./config/db");
const { connectRedis, redisClient } = require("./config/redis");
const { hasGoogleConfig } = require("./config/passport");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const doctorAvailabilityRoutes = require("./routes/doctorAvailabilityRoutes");
const medicalRequestRoutes = require("./routes/medicalRequestRoutes");
const requestId = require("./middleware/requestId");
const errorHandler = require("./middleware/errorHandler");
const sanitizeRequest = require("./middleware/sanitizeRequest");

const app = express();

app.use(cors());
app.use(express.json());
app.use(sanitizeRequest);
app.use(helmet());
app.use(passport.initialize());
app.use(requestId);

app.get("/", (req, res) => {
  res.send("Healthcare Backend is running!");
});

app.use("/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/profiles", profileRoutes);
app.use("/api/v1/doctors/availability", doctorAvailabilityRoutes);
app.use("/api/v1/requests", medicalRequestRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    await connectRedis();
    await redisClient.set("healthcheck", "connected");
    console.log("Redis connected");

    if (!hasGoogleConfig) {
      console.warn("Google OAuth is disabled because its environment variables are not set");
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Server startup failed:", err.message);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
