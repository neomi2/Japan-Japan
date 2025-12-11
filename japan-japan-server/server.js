import express from "express";
import mealRoutes from "./routes/mealRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/meals", mealRoutes);

app.get("/", (req, res) => {
  res.send("japan japan page!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 