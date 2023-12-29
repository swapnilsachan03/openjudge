import mongoose from "mongoose";

const problemSchema = mongoose.Schema({
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
    required: true,
  },

  tags: {
    type: [String],
    required: true,
  },

  solution: {
    type: String,
    required: true,
  },
  
  solutionLanguage: {
    type: String,
    required: true,
  },

  solutionTime: {
    type: Number,
    required: true,
  },

  solutionSpace: {
    type: Number,
    required: true,
  },

  solutionCode: {
    type: String,
    required: true,
  },

  solutionInput: {
    type: String,
    required: true,
  },

  solutionOutput: {
    type: String,
    required: true,
  }
});