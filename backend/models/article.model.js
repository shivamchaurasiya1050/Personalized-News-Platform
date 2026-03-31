const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  pubDate: Date,
  category: String,
  sourceAgent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  uniqueHash: { type: String, unique: true }
});

schema.index({ pubDate: -1 });
schema.index({ category: 1 });

module.exports = mongoose.model("Article", schema);