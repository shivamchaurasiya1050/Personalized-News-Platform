const adAnalytics = require("../models/ad.analytics");

exports.adView = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const adId = req.params.id;

    let record = await adAnalytics.findOne({ userId, adId });
    if (!record) {
      await adAnalytics.create({
        userId,
        adId,
        viewed: true,
        clicked: false,
      });
    } else if (!record.viewed) {
      record.viewed = true;
      await record.save();
    }

    res.json({ success: true });
  } catch (err) {
    console.error("View Error:", err);
    return res.status(500).json({ msg: "View error" });
  }
};

exports.adClick = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const adId = req.params.id;

    let record = await adAnalytics.findOne({ userId, adId });
    if (!record) {
      await adAnalytics.create({
        userId,
        adId,
        viewed: false,
        clicked: true,
      });
    } else if (!record.clicked) {
      record.clicked = true;
      await record.save();
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Click Error:", err);
    return res.status(500).json({ msg: "Click error" });
  }
};

exports.getAdAnalytics = async (req, res) => {
  try {
    const result = await adAnalytics.aggregate([
      {
        $group: {
          _id: "$adId",

          views: {
            $sum: {
              $cond: [{ $eq: ["$viewed", true] }, 1, 0],
            },
          },

          clicks: {
            $sum: {
              $cond: [{ $eq: ["$clicked", true] }, 1, 0],
            },
          },
        },
      },
    ]);

    return res.json(result);
  } catch (err) {
    console.error("Analytics Error:", err);
    return res.status(500).json({ msg: "Error fetching analytics" });
  }
};
