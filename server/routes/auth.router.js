import express from "express";
import {
  AuthIndex,
  GoogleAuth,
  SignIn,
  SignUp,
} from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", AuthIndex);

authRouter.post("/signup", SignUp);

authRouter.post("/signin", SignIn);

authRouter.post("/googleAuth", GoogleAuth);

export default authRouter;
