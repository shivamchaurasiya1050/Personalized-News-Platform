const express = require("express");
const router = express.Router();

const {
  adView,
  adClick,
  getAdAnalytics,
} = require("../controllers/ad.analytics.controller");
const auth = require("../middleware/auth");

router.post("/view/:id", auth, adView);
router.post("/click/:id", auth, adClick);
router.get("/admin/analytics", auth, getAdAnalytics);
module.exports = router;
