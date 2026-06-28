const router = require("express").Router();
const { protect } = require("../middleware/auth");
const c = require("../controllers/project.controller");

// Public
router.get("/", c.getAll);
router.get("/:slug", c.getBySlug);

// Admin (protected)
router.post("/", protect, c.create);
router.patch("/reorder", protect, c.reorder);
router.patch("/:id", protect, c.update);
router.delete("/:id", protect, c.remove);

module.exports = router;
