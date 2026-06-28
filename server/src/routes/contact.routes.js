const router = require("express").Router();
const { protect } = require("../middleware/auth");
const c = require("../controllers/contact.controller");

// Public
router.post("/", c.submit);

// Admin (protected)
router.get("/stats", protect, c.stats);
router.get("/", protect, c.getAll);
router.get("/:id", protect, c.getOne);
router.patch("/:id", protect, c.update);
router.delete("/:id", protect, c.remove);

module.exports = router;
