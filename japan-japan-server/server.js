import express from "express";
import mongoose from "mongoose"; 
import mealRoutes from "./routes/mealRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// ⬇️ החיבור למונגו – כאן בדיוק
mongoose
  .connect(
    "mongodb+srv://n0504142320_db_user:U3TgdSihsS9SnlNY@japanjapancluster.nshrxll.mongodb.net/"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/meals", mealRoutes);

app.get("/", (req, res) => {
  res.send("japan japan page!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
