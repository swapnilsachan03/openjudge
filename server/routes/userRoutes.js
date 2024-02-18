import express from "express"
import { deleteProfile, getProfile, login, logout, register } from "../controllers/userController.js"

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/me").get(getProfile).delete(deleteProfile)

export default router
