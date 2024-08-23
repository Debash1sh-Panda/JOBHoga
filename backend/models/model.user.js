const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["student", "recruiter"],
    require: true,
  },
  profile: {
    bio: { type: String },
    skills: [{ type: String }],
    resume: { type: String }, //url to resume file
    resumeOriginalName: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    profilePhoto: { type: String, default: "" },
  },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
