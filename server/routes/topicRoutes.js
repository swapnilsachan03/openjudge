import express from "express"
import { isAuthenticated } from "../middlewares/auth"

import { createTopic, deleteTopic, getTopic, getTopics, updateTopic } from "../controllers/topicController"

const router = express.Router()

router
  .route("/topics")
  .get(getTopics)
  .post(isAuthenticated, createTopic)

router
  .route("/topic/:_id")
  .get(isAuthenticated, getTopic)
  .put(isAuthenticated, updateTopic)
  .delete(isAuthenticated, deleteTopic)

export default router
