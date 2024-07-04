import express from "express";
import connectDB from "./lib/db.js";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import cors from "cors";

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

const PORT_NUMBER = 8000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server running on http://localhost:${PORT_NUMBER}`);
});

app.use("/", userRouter);
app.use("/auth", authRouter);
