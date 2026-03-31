const router = require("express").Router();

const {
  createAgent,
  getAgents,
  updateAgent,
  deleteAgent,
  createAd,
  getAds,
  updateAd,
  deleteAd
} = require("../controllers/admin.controller");
const auth = require("../middleware/auth");

// ======================
//  AGENT ROUTES
// ======================

router.post("/agent",auth, createAgent);
router.get("/agent",auth, getAgents);
router.put("/agent/:id",auth, updateAgent);
router.delete("/agent/:id",auth, deleteAgent);

// ======================
// ADS ROUTES
// ======================

router.post("/ads",auth, createAd);
router.get("/ads",auth, getAds);
router.put("/ads/:id",auth, updateAd);
router.delete("/ads/:id",auth, deleteAd);

module.exports = router;