import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();

console.log("Starting server...");

connectDB()
  .then(() => {
    console.log("DB connected, starting Express server...");
    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, "0.0.0.0", () => {
      // ✅ Added '0.0.0.0'
      console.log(`✅ Server is ACTUALLY running on http://localhost:${PORT}`);
      console.log(`Test it: http://localhost:${PORT}/api/auth/register`);
    });

    server.on("error", (err) => {
      // ✅ Added error handler
      console.error("❌ Server error:", err);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1); // ✅ Exit if DB fails
  });
