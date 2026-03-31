const Agent = require("../models/agent.model");
const Ad = require("../models/ads.model");

// ======================
// AGENTS (RSS)
// ======================

// Create Agent

exports.createAgent = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    const { name,rssUrl} = req.body;
    if (!name || !rssUrl) {
      return res.status(400).json({
        success: false,
        message: "Name, rssurl is required"
      });
    }
   
    const agent = await Agent.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Agent created successfully",
      data: agent
    });

  } catch (error) {
    console.error("Create Agent Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// Get Agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update Agent
exports.updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(agent);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete Agent

exports.deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }
    const agent = await Agent.findByIdAndDelete(id);

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Agent deleted successfully"
    });

  } catch (error) {
    console.error("Delete Agent Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// ======================
// ADS
// ======================

// Create Ad
exports.createAd = async (req, res) => {
  try {
    const ad = await Ad.create(req.body);
    res.json(ad);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get Ads
exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update Ad
exports.updateAd = async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(ad);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found"
      });
    }
    if (
      req.user.role !== "admin" &&
      ad.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }
    await ad.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Ad deleted successfully"
    });

  } catch (error) {
    console.error("Delete Ad Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};