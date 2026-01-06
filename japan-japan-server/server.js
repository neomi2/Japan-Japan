import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose"; 
import cors from "cors";
import mealRoutes from "./routes/mealRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/meals", mealRoutes);

app.get("/", (req, res) => {
  res.send("japan japan page!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
