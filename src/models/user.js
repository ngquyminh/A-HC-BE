/* eslint-disable func-names */
const mongoose = require("mongoose");
const { createDecipheriv, createCipheriv, randomBytes } = require("crypto");
const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
  },
  lastName:{
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    validate: [isEmail, "No valid email address provided."],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  activeRate: {
    type: Number,
  },

  // NEW
  status: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  dob: {
    type: Date,
  },
  signUpDate: {
    type: Date,
  },

  // END NEW

  isVerified: {
    type: Boolean,
  },
  verificationCode: {
    type: String,
  },
  forgotToken: {
    type: String,
  },
  resetPasswordExpires: {
    Date,
  },
  bmiRate: { type: mongoose.Schema.Types.ObjectId, ref: "BMIRate" },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
});

userSchema.statics.findByLogin = async function (username) {
  let user = await this.findOne({
    username: username,
  });

  if (!user) {
    user = await this.findOne({ email: username });
  }

  return user;
};

userSchema.pre("remove", function (next) {
  this.model("Message").deleteMany({ userId: this._id }, next);
});

// Defining algorithm
const algorithm = "aes-256-cbc";
// Defining key
const key = process.env.SECRET;
// Defining iv
const iv = randomBytes(16).toString("hex").slice(0, 16);

userSchema.pre("save", async function () {
  this.password = await this.generatePasswordHash();
});

userSchema.methods.generatePasswordHash = async function () {
  // Updating text
  const encrypter = createCipheriv(algorithm, key, iv);
  let encrypted = encrypter.update(this.password, "utf-8", "hex");
  encrypted += encrypter.final("hex");
  return encrypted;
};

userSchema.methods.validatePassword = async function (password) {
  // make the decrypter function
  const decrypter = createDecipheriv(algorithm, key, iv);
  let decrypted = decrypter.update(this.password, "hex", "utf8");
  decrypted += decrypter.final("utf8");
  return decrypted === password;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
