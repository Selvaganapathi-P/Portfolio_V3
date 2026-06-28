const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String, required: true },
    longDescription: String,
    github: String,
    live: String,
    status: {
      type: String,
      enum: ["live", "completed", "wip"],
      default: "completed",
    },
    featured: { type: Boolean, default: false },
    category: { type: String, trim: true },
    year: { type: Number, default: () => new Date().getFullYear() },
    problem: String,
    solution: String,
    architecture: String,
    challenges: [String],
    techStack: [String],
    features: [String],
    metrics: { type: Map, of: String },
    coverImage: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ featured: 1, order: 1 });
projectSchema.index({ slug: 1 });

module.exports = mongoose.model("Project", projectSchema);
