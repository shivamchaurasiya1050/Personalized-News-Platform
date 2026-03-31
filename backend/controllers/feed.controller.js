const Article = require("../models/article.model");
const Ad = require("../models/ads.model");
const User = require("../models/user.model");
const { injectAds } = require("../utils/ad.injector");

exports.personalized = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

  
    const filter = {
      category: { $in: user.preferences }
    };
    const totalArticles = await Article.countDocuments(filter);
    const articles = await Article.find(filter)
      .sort({ pubDate: -1 })
      .skip(skip)
      .limit(limit);
    const ads = await Ad.find(filter);

    const finalData = injectAds(articles, ads);

   return res.status(200).json({
      success: true,
      message: "Personalized feed fetched successfully",
      data: finalData,
      pagination: {
        total: totalArticles,
        currentPage: page,
        totalPages: Math.ceil(totalArticles / limit),
        limit
      }
    });

  } catch (error) {
    console.error(error);
   return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

exports.category = async (req, res) => {
  try {
    const category = req.params.category;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = { category };
    const totalArticles = await Article.countDocuments(filter);

    const articles = await Article.find(filter)
      .sort({ pubDate: -1 })
      .skip(skip)
      .limit(limit);

    const ads = await Ad.find(filter);
    const finalData = injectAds(articles, ads);
    res.status(200).json({
      success: true,
      message: "Category feed fetched successfully",
      data: finalData,
      pagination: {
        total: totalArticles,
        currentPage: page,
        totalPages: Math.ceil(totalArticles / limit),
        limit
      }
    });

  } catch (error) {
    console.error("Category API Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

exports.trending = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const articles = await Article.find()
      .sort({ pubDate: -1 })
      .limit(limit);
    const ads = await Ad.aggregate([{ $sample: { size: 10 } }]);
    const data = injectAds(articles, ads);
    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    console.error("Trending Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};