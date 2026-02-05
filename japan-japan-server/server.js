import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose"; 
import cors from "cors";
import mealRoutes from "./routes/mealRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/meals", mealRoutes);
app.use("/users", userRoutes);
app.use("/orders",orderRoutes );


app.get("/", (req, res) => {
  res.send("japan japan page!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
