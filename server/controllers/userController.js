import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js"
import User from "../models/user.js"
import { sendToken } from "../utils/sendToken.js"

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if (!name || !email || !password) {
    return next(new ErrorHandler(
      "Please enter your name, email and password", 400
    ))
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists", 409))
  }

  let file_name = ""
  let url = ""

  if (file) {
    // do file upload funtions
  }

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      file_name,
      url
    }
  })

  sendToken(res, user, "User registered successfully", 201)
})

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400))
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    return next(new ErrorHandler(
      "Incorrect email or password", 401
    ))
  }

  const isMatched = await user.comparePassword(password)

  if (!isMatched) {
    return next(new ErrorHandler(
      "Incorrect password", 401
    ))
  }

  sendToken(res, user, `Welcome back ${user.name}!`, 201)
})

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .clearCookie("token", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: true
    })
    .json({
      success: true,
      message: "Logged out successfully"
    })
})

export const getProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res
    .status(200)
    .json({
      success: true,
      user
    })
})

export const deleteProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  // delete all submissions
  // delete image if it exists

  await user.deleteOne();

  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now())
    })
    .json({
      status: 200,
      message: "Profile deleted successfully"
    })
})
