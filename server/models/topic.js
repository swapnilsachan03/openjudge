import mongoose from "mongoose"

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  problemsCount: {
    type: Number,
    default: 0,
  }
})

export default mongoose.model("Topic", schema)
