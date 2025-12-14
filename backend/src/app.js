import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import sweetRoutes from "./routes/sweet.routes.js";
// creates the express app instance
const app = express();

// accepts the application incoming request in backend
app.use(cors());

// this add the middleware
app.use(express.json());

// this is get route defining here /
app.use("/api/auth", authRoutes);
app.use("/api/sweet", sweetRoutes);

app.get("/", (req, res) => {
  res.send("Sweet Shop API");
});

export default app;
