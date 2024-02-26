import mongoose from "mongoose"

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },

  topics: [
    {
      name: {
        type: String,
        required: true,
      },

      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
      }
    }
  ],

  constraints: {
    time: {
      type: Number,
      required: true,
    },
    
    memory: {
      type: Number,
      required: true,
    }
  },

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

schema.pre("deleteOne", async function(next) {
  await this.model("Submission").deleteMany({ problem: this._id });
  next();
})

export default mongoose.model("Problem", schema)
