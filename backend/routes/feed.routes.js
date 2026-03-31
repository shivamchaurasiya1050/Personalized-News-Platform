const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/feed.controller");

router.get("/personalized", auth, controller.personalized);
router.get("/category/:category", controller.category);
router.get("/trending", controller.trending);

module.exports = router;