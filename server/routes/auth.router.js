import express from "express";
import { AuthIndex } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", AuthIndex);

export default authRouter;
