import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import router from "./router/auth.js";
import aiRoutes from "./router/ai.js";
import { connectDB } from "./db/conn.js";



const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

const consoleURL = (req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
};

app.use(consoleURL);

app.use("/api/auth", router);
app.use("/api", aiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World 🚀");
});

app.use((req, res) => {
  res.status(404).send(`
    <center>
      <h1>404</h1>
      <h3>The page you are looking for was not found</h3>
    </center>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
