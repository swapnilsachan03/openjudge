import express from "express"
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js"

import { createProblem, deleteProblem, getProblem, getProblems, updateProblem } from "../controllers/problemController.js"

const router = express.Router()

router
  .route('/problems')
  .get(getProblems)
  .post(isAuthenticated, authorizeAdmin, createProblem)

router
  .route("/problem/:_id")
  .get(isAuthenticated, getProblem)
  .put(isAuthenticated, authorizeAdmin, updateProblem)
  .delete(isAuthenticated, authorizeAdmin, deleteProblem)

export default router
