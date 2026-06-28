const router = require("express").Router();
const { protect } = require("../middleware/auth");
const c = require("../controllers/blog.controller");

// Public
router.get("/published", c.getPublished);
router.get("/published/:slug", c.getBySlug);

// Admin (protected)
router.get("/", protect, c.getAll);
router.post("/", protect, c.create);
router.patch("/:id", protect, c.update);
router.delete("/:id", protect, c.remove);

module.exports = router;
