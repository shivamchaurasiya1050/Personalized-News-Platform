const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,

  email: { 
    type: String, 
    unique: true,
    required: true 
  },

  password: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  preferences: [String],
  savedArticles: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Article" }
  ]

}, { timestamps: true });

module.exports = mongoose.model("User", schema);