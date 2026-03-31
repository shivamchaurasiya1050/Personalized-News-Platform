const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    adId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
      required: true,
    },
    clicked:{
      type:Boolean
    },
    viewed:{
      type:Boolean
    }

  },
  {
    timestamps: true,
  }
);

// optional: unique per user+ad (if needed)
schema.index({ userId: 1, adId: 1 }, { unique: true });

module.exports = mongoose.model("AdAnalytics", schema);