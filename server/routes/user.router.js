import express from "express";
import { Index } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", Index);

export default userRouter;
