import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import sweetRoutes from "./routes/sweet.routes.js";
// creates the express app instance
const app = express();

// accepts the application incoming request in backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // ✅ Add this
  })
);

// this add the middleware
app.use(express.json());

// this is get route defining here /
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.use((req, res) => {
  console.log("❌ Route not found:", req.method, req.url);
  res.status(404).json({ message: "Route not found" });
});

export default app;
