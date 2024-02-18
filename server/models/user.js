import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },

  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  avatar: {
    file_name: {
      type: String,
    },

    url: {
      type: String,
    },
  },

  submissions: [
    {
      submission: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Submission",
      }
    }
  ],

  solvedProblems: [
    {
      problem: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Problem",
      }
    }
  ],

  solvedProblemsCount: {
    easy: {
      type: Number,
      default: 0,
    },

    medium: {
      type: Number,
      default: 0,
    },

    hard: {
      type: Number,
      default: 0,
    }
  },
})

schema.pre("save", async function(next) {
  if(!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
})

schema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

schema.methods.getJWTToken = function() {
  return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
}

schema.methods.getResetToken = function() {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
}

export default mongoose.model("User", schema)
