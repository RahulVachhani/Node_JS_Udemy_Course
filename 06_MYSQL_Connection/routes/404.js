import express from "express";
import { notFoundPage } from "../controllers/404.js";

const router = express.Router()

router.use(notFoundPage)


export default router