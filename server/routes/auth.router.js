import express from "express";
import { AuthIndex, SignIn, SignUp } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", AuthIndex);

authRouter.post("/signup", SignUp);

authRouter.post("/signin", SignIn);

export default authRouter;
