import Problem from '../models/problem.js'

import ErrorHandler from '../utils/errorHandler.js'
import { catchAsyncError } from '../middlewares/catchAsyncError.js'

export const getProblems = catchAsyncError(async (req, res, next) => {
  const problems = await Problem.find()

  // get by difficulty, topics, etc.

  res.status(200).json({
    success: true,
    problems
  })
})

export const getProblem = catchAsyncError(async (req, res, next) => {
  const problem = await Problem.findById(req.params._id)

  if (!problem) {
    return next(new ErrorHandler('Problem not found', 404))
  }

  res.status(200).json({
    success: true,
    problem
  })
})

export const createProblem = catchAsyncError(async (req, res, next) => {
  const { title, description, difficulty, topics, constraints, testcases, solutions } = req.body

  if (!title || !description || !difficulty || !topics || !constraints || !testcases || !solutions) {
    return next(new ErrorHandler('Please fill in all fields', 400))
  }

  const problem = await Problem.create({
    title,
    description,
    difficulty,
    topics,
    constraints,
    testcases,
    solutions
  })

  res.status(201).json({
    success: true,
    problem
  })
})

export const updateProblem = catchAsyncError(async (req, res, next) => {
  let problem = await Problem.findById(req.params._id)

  if (!problem) {
    return next(new ErrorHandler('Problem not found', 404))
  }

  const { title, description, difficulty, topics, constraints, testcases, solutions } = req.body

  if (!title || !description || !difficulty || !topics || !constraints || !testcases || !solutions) {
    return next(new ErrorHandler('Please fill in all fields', 400))
  }

  problem = await Problem.findByIdAndUpdate(req.params.id, {
    title,
    description,
    difficulty,
    topics,
    constraints,
    testcases,
    solutions
  }, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    problem
  })
})

export const deleteProblem = catchAsyncError(async (req, res, next) => {
  const problem = await Problem.findById(req.params._id)

  if (!problem) {
    return next(new ErrorHandler('Problem not found', 404))
  }

  await problem.deleteOne()

  res.status(200).json({
    success: true,
    message: 'Problem is deleted'
  })
})
