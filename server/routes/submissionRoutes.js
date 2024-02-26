import express from "express"
import { isAuthenticated } from "../middlewares/auth"

import { createSubmission, getSubmission, getSubmissions, getUserSubmissions } from "../controllers/submissionController"

const router = express.Router()

router
  .route("/submissions")
  .get(isAuthenticated, getSubmissions)
  .post(isAuthenticated, createSubmission)

router
  .route("/submissions/:_id")
  .get(isAuthenticated, getUserSubmissions)

router
  .route("/submission/:_id")
  .get(isAuthenticated, getSubmission)

export default router
