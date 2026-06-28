const BlogPost = require("../models/BlogPost");

function slugify(str) {
  return str.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

// Public — list published posts
const getPublished = async (req, res, next) => {
  try {
    const { tag, page = 1, limit = 12 } = req.query;
    const filter = { status: "published" };
    if (tag) filter.tags = tag.toLowerCase();
    const skip = (Number(page) - 1) * Number(limit);

    const [posts, total] = await Promise.all([
      BlogPost.find(filter, "-content")
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      BlogPost.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    });
  } catch (err) {
    next(err);
  }
};

// Public — get single post by slug + increment views
const getBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug, status: "published" },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// Admin — list all posts (all statuses)
const getAll = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [posts, total] = await Promise.all([
      BlogPost.find(filter, "-content").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      BlogPost.countDocuments(filter),
    ]);

    res.json({ success: true, data: posts, pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } });
  } catch (err) {
    next(err);
  }
};

// Admin — create post
const create = async (req, res, next) => {
  try {
    const { title, slug, excerpt, content, tags, category, status, coverImage } = req.body;

    if (!title || !content || !excerpt) {
      return res.status(400).json({ success: false, message: "title, excerpt and content are required" });
    }

    const post = await BlogPost.create({
      title: title.trim(),
      slug: slug ? slugify(slug) : slugify(title),
      excerpt: excerpt.trim(),
      content,
      tags: Array.isArray(tags) ? tags : [],
      category,
      status: status || "draft",
      coverImage,
    });

    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// Admin — update post
const update = async (req, res, next) => {
  try {
    const allowed = ["title", "slug", "excerpt", "content", "tags", "category", "status", "coverImage"];
    const updates = {};
    allowed.forEach((key) => { if (req.body[key] !== undefined) updates[key] = req.body[key]; });
    if (updates.slug) updates.slug = slugify(updates.slug);

    const post = await BlogPost.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// Admin — delete post
const remove = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPublished, getBySlug, getAll, create, update, remove };
