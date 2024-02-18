import express from "express"
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js"
import singleUpload from "../middlewares/multer.js"

import { deleteProfile, getProfile, login, logout, register } from "../controllers/userController.js"

const router = express.Router()

router.route("/register").post(singleUpload, register)
router.route("/login").post(login)
router.route("/logout").get(isAuthenticated, logout)
router.route("/me").get(isAuthenticated, getProfile).delete(isAuthenticated, deleteProfile)

export default router
