const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  targetLink: String,
  category: String,
  isActive: Boolean
});

module.exports = mongoose.model("Ad", schema);