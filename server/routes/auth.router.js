import express from "express";
import { AuthIndex, SignUp } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", AuthIndex);

authRouter.post("/signup", SignUp);

export default authRouter;
