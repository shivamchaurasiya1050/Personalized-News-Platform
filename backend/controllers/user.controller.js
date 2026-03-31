const articleModel = require("../models/article.model");
const User = require("../models/user.model");

exports.updatePreferences = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const allowedFields = ["preferences", "interests", "notifications"];

    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update"
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Preferences updated successfully",
      data: updatedUser
    });

  } catch (error) {
    console.error("Update Preferences Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

exports.saveArticle = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const articleId = req.body.articleId;

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.savedArticles.includes(articleId)) {
 
      user.savedArticles = user.savedArticles.filter(
        id => id.toString() !== articleId
      );

      await user.save();

      return res.json({
        success: true,
        message: "Article removed from saved ",
        isSaved: false
      });

    } else {
      user.savedArticles.push(articleId);
      await user.save();

      return res.json({
        success: true,
        message: "Article saved ",
        isSaved: true
      });
    }

  } catch (error) {
    console.error("Save Toggle Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

exports.getSavedArticles = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findById(userId).select("savedArticles");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const total = user.savedArticles.length;
    const articles = await articleModel.find({
      _id: { $in: user.savedArticles }
    })
      .sort({ pubDate: -1 })
      .skip(skip)
      .limit(limit);

    //  Response
    res.status(200).json({
      success: true,
      message: "Saved articles fetched successfully",
      data: articles,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit
      }
    });

  } catch (error) {
    console.error("Saved Articles Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};