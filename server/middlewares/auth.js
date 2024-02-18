import jwt from "jsonwebtoken"
import User from "../models/user.js"
import ErrorHandler from "../utils/errorHandler.js"
import { catchAsyncError } from "./catchAsyncError.js"

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if(!token) {
    return next(new ErrorHandler("Please login to access.", 401))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
})

export const authorizeAdmin = (req, res, next) => {
  if(req.user.role !== "admin") {
    return next(new ErrorHandler(
      `${req.user.role} role is not not allowed to access this resource.`,
      403
    ))
  }

  next();
}
