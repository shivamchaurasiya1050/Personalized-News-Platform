const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  updatePreferences,
  saveArticle,
  getSavedArticles
} = require("../controllers/user.controller");
router.put("/preferences", auth, updatePreferences);
router.post("/save", auth, saveArticle);
router.get("/saved", auth, getSavedArticles);

module.exports = router;