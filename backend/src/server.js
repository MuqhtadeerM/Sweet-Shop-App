import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

// loads the .env file variables into process env
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
