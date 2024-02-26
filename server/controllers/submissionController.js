import Submission from '../models/submission.js'
import Problem from '../models/problem.js'

import ErrorHandler from '../utils/errorHandler.js'
import { catchAsyncError } from '../middlewares/catchAsyncError.js'

export const getSubmissions = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id
  const problemId = req.params._id

  const problem = await Problem.findById(problemId);

  if (!problem) {
    return next(new ErrorHandler('Invalid problem ID', 400))
  }

  const submissions = await Submission.find({
    user: userId,
    problem: problemId
  })

  res.status(200).json({
    success: true,
    submissions
  })
})

export const getUserSubmissions = catchAsyncError(async (req, res, next) => {
  const userId = req.params._id

  const submissions = await Submission.find({
    user: userId
  })

  res.status(200).json({
    success: true,
    submissions
  })
})

export const getSubmission = catchAsyncError(async (req, res, next) => {
  const submissionId = req.params._id
  const submission = await Submission.findById(submissionId)

  if (!submission) {
    return next(new ErrorHandler('Invalid submission ID', 400))
  }

  res.status(200).json({
    success: true,
    submission
  })
})

export const createSubmission = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id
  const { problemId, language, code } = req.body
  
  const user = await User.findById(userId)
  const problem = await Problem.findById(problemId)
  
  if (!problem) {
    return next(new ErrorHandler('Invalid problem ID', 400))
  }

  // judge the code here

  const verdict = "AC"
  const time = 1000
  const space = 1000

  const submission = await Submission.create({
    user: userId,
    problem: problemId,
    code,
    language,
    verdict,
    time,
    space
  })

  problem.submissions += 1

  if (verdict === "AC") {
    problem.accepted += 1
    user.solvedProblems.push(problem._id)
  
    if (problem.difficulty === "Easy") user.solvedProblemsCount.easy += 1
    if (problem.difficulty === "Medium") user.solvedProblemsCount.medium += 1
    if (problem.difficulty === "Hard") user.solvedProblemsCount.hard += 1
  }

  await problem.save()
  await user.save()

  res.status(201).json({
    success: true,
    submission
  })
})
