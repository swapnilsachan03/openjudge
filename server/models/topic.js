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
})

export default mongoose.model("Topic", schema)
