const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  rssUrl: String,
  category: String,
  isActive: Boolean
});

module.exports = mongoose.model("Agent", schema);