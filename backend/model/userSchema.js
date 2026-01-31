import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "not_mentioned",
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


// we are geenrating jokens
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
  } catch (err) {
    console.error("Token Error:", err);
  }
};


const User = mongoose.model("User",userSchema);

export default User;

