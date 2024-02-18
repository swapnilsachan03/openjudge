import mongoose from "mongoose"

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },

  language: {
    type: String,
    enum: ["cpp", "java", "python"],
    required: true,
  },

  code: {
    type: String,
    required: true,
  },

  verdict: {
    type: String,
    required: true,
  },

  time: {
    type: Number,
    required: true,
  },

  space: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
})

export default mongoose.model("Submission", schema)
