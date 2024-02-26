import express from "express"
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js"

import { createProblem } from "../controllers/problemController.js"

const router = express.Router()

router.route("/problem").post(isAuthenticated, authorizeAdmin, createProblem)

export default router
