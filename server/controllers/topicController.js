import Topic from "../models/topic"
import Problem from "../models/problem"

import ErrorHandler from "../utils/errorHandler"
import { catchAsyncError } from "../middlewares/catchAsyncError"

export const getTopics = catchAsyncError(async (req, res, next) => {
  const topics = await Topic.find()

  res.status(200).json({
    success: true,
    topics
  })
})

export const getTopic = catchAsyncError(async (req, res, next) => {
  const topic = await Topic.findById(req.params._id).populate("problems", "title difficulty submissions accepted")

  if (!topic) {
    return next(new ErrorHandler("Topic not found", 404))
  }

  res.status(200).json({
    success: true,
    topic
  })
})

export const createTopic = catchAsyncError(async (req, res, next) => {
  const { title } = req.body

  if (!title) {
    return next(new ErrorHandler("Please enter the topic name", 400))
  }

  const topic = await Topic.create({
    title
  })

  res.status(201).json({
    success: true,
    topic
  })
})

const updateTopic = catchAsyncError(async (req, res, next) => {
  let topic = await Topic.findById(req.params._id)

  if (!topic) {
    return next(new ErrorHandler("Topic not found", 404))
  }

  const { name } = req.body

  if (!name) {
    return next(new ErrorHandler("Please enter the topic name", 400))
  }

  topic = await Topic.findByIdAndUpdate(req.params._id, {
    name
  }, {
    new: true,
    runValidators: true
  })

  const problems = await Problem.find({ topic: {
    $elemMatch: {
      id: topic._id
    },
  }})

  problems.forEach(async problem => {
    problem.topics = problem.topics.map(t => {
      if (t.id === topic._id) {
        t.name = name
      }

      return t
    })

    await problem.save()
  })

  res.status(200).json({
    success: true,
    topic
  })
})

export const deleteTopic = catchAsyncError(async (req, res, next) => {
  const topic = await Topic.findById(req.params._id)

  if (!topic) {
    return next(new ErrorHandler("Topic not found", 404))
  }

  // we need to remove the topic from the problems

  await topic.remove()

  res.status(200).json({
    success: true,
    message: "Topic is deleted"
  })
})
