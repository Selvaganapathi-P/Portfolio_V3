const Project = require("../models/Project");

// Public — list all projects
const getAll = async (req, res, next) => {
  try {
    const { featured, category } = req.query;
    const filter = {};
    if (featured === "true") filter.featured = true;
    if (category) filter.category = category;

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

// Public — get single by slug
const getBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// Admin — create project
const create = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// Admin — update project
const update = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// Admin — delete project
const remove = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    next(err);
  }
};

// Admin — reorder projects
const reorder = async (req, res, next) => {
  try {
    const { order } = req.body; // [{ id, order }, ...]
    await Promise.all(
      order.map(({ id, order: o }) => Project.findByIdAndUpdate(id, { order: o }))
    );
    res.json({ success: true, message: "Reordered" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getBySlug, create, update, remove, reorder };
