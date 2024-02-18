import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import ErrorMiddleware from "./middlewares/error.js"
import { connectDB } from "./config/database.js"

import user from "./routes/userRoutes.js"
import problem from "./routes/problemRoutes.js"

dotenv.config({
  path: "./config/.env",
})

const app = express()

// using middlewares

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET, POST, PUT, DELETE"],
}))

// implementing routes

app.use("/api", user)
app.use("/api", problem)

// connecting to & listening on the server

connectDB()
app.use(ErrorMiddleware)

app.get("/", (req, res) => {
  res.send("API is running...")
})

app.listen(process.env.PORT, () => {
  console.log(`Serving on port ${process.env.PORT || 3000}`)
})
