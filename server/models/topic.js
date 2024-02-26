import mongoose from "mongoose"

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    }
  ],

  problemsCount: {
    type: Number,
    default: 0,
  }
})

export default mongoose.model("Topic", schema)
