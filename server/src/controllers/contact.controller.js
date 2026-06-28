const Contact = require("../models/Contact");

// Public — submit contact form
const submit = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    const contact = await Contact.create({
      name: name.trim().slice(0, 100),
      email: email.toLowerCase().trim(),
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      id: contact._id,
    });
  } catch (err) {
    next(err);
  }
};

// Admin — list all submissions
const getAll = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Contact.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: contacts,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    });
  } catch (err) {
    next(err);
  }
};

// Admin — get single
const getOne = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: "Not found" });

    // Auto-mark as read
    if (contact.status === "new") {
      contact.status = "read";
      await contact.save();
    }

    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// Admin — update status / notes
const update = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(notes !== undefined && { notes }) },
      { new: true, runValidators: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// Admin — delete
const remove = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

// Admin — stats summary
const stats = async (req, res, next) => {
  try {
    const counts = await Contact.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const summary = { new: 0, read: 0, replied: 0, archived: 0, total: 0 };
    counts.forEach(({ _id, count }) => {
      summary[_id] = count;
      summary.total += count;
    });
    res.json({ success: true, data: summary });
  } catch (err) {
    next(err);
  }
};

module.exports = { submit, getAll, getOne, update, remove, stats };
