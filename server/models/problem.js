import mongoose from "mongoose"

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  statement: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },

  topics: [{
    type: String,
    required: true,
  }],

  testcases: [
    {
      input: {
        type: String,
        required: true,
      },

      output: {
        type: String,
        required: true,
      },
    }
  ],

  solutions: [
    {
      language: {
        type: String,
        enum: ["cpp", "java", "python"],
        required: true,
      },

      code: {
        type: String,
        required: true,
      },
    }
  ],

  submissions: {
    type: Number,
    default: 0,
  },

  accepted: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("Problem", schema)
