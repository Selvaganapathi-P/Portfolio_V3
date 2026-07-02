const AdminUser = require("../models/AdminUser");
const Project = require("../models/Project");

const seedProjects = [
  {
    title: "E-commerce Website",
    slug: "ecommerce-website",
    subtitle: "Full-Stack E-Commerce & Expense Tracking Platform",
    description:
      "A full-stack e-commerce and expense tracking application built with MongoDB, featuring JWT authentication, secure user management, data visualization, and role-based admin access.",
    github: "https://github.com/SelvaganapathiP/ecommerce-expense",
    status: "completed",
    featured: true,
    category: "Full Stack",
    year: 2024,
    problem: "Businesses needed a unified platform combining e-commerce product management with expense tracking.",
    solution: "Built a MERN stack monorepo with admin and user portals sharing a single MongoDB backend.",
    architecture: "React SPA frontend with Express.js REST API. MongoDB stores all data with Mongoose schemas.",
    challenges: [
      "Implementing granular role-based access without a heavy auth library",
      "Real-time chart updates reflecting live data changes",
      "Efficient MongoDB aggregation pipelines for expense analytics",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Multer", "Recharts", "CSS"],
    features: [
      "JWT Authentication & Authorization",
      "Role-Based Access Control",
      "Product Management & CRUD",
      "Expense Tracker with Categories",
      "Data Visualization with Recharts",
      "Admin Dashboard",
    ],
    metrics: new Map([["features", "10+"], ["apiRoutes", "25+"], ["components", "30+"]]),
    order: 1,
  },
  {
    title: "Studiopro",
    slug: "studiopro",
    subtitle: "Photography Studio Booking & Management Platform",
    description:
      "A full-stack photography studio platform with secure authentication, role-based admin/user access, complete booking and order system, and a feature-rich admin dashboard.",
    live: "https://glestudio.vercel.app/",
    status: "live",
    featured: true,
    category: "Full Stack",
    year: 2025,
    problem: "Photography studios were managing bookings, galleries, staff, and client communications through disconnected tools.",
    solution: "Designed and deployed a purpose-built MERN platform with distinct admin and client interfaces.",
    architecture: "Deployed on Vercel (frontend) with Express.js API server. MongoDB Atlas stores all studio data.",
    challenges: [
      "Building a real-time booking availability system without race conditions",
      "Designing a flexible gallery management system supporting bulk uploads",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Multer", "Recharts", "CSS", "Vercel"],
    features: [
      "Secure JWT Authentication",
      "Role-Based Admin & User Access",
      "Photography Booking System",
      "Admin Dashboard with Analytics",
    ],
    metrics: new Map([["deployed", "Live on Vercel"], ["features", "15+"], ["dashboardModules", "6"]]),
    order: 2,
  },
  {
    title: "CineVault",
    slug: "cinevault",
    subtitle: "Real-Time Cinema Seat Booking Application",
    description:
      "A full-stack cinema booking application with real-time seat selection, dynamic filtering, interactive seat maps with tier-based pricing, and live availability tracking.",
    live: "https://cinevalutzone.netlify.app",
    status: "live",
    featured: true,
    category: "Frontend",
    year: 2024,
    problem: "Building a cinema booking UI with actual real-time seat state and tier pricing logic.",
    solution: "Built a React application with a custom seat-map engine and LocalStorage persistence.",
    architecture: "Pure React SPA. All booking state managed with React state persisted to LocalStorage.",
    challenges: [
      "Building an efficient seat-map rendering engine that scales to 200+ seats",
      "Implementing tier-based pricing with accurate real-time totals",
    ],
    techStack: ["React", "JavaScript", "CSS3", "LocalStorage", "REST APIs"],
    features: [
      "Real-Time Seat Selection",
      "Interactive Animated Seat Map",
      "Tier-Based Pricing",
      "Live Availability Tracking",
    ],
    metrics: new Map([["deployed", "Live on Netlify"], ["seatsRendered", "200+"], ["pricingTiers", "3"]]),
    order: 3,
  },
];

async function autoSeed() {
  try {
    const existingAdmin = await AdminUser.findOne({ username: "admin" });
    if (!existingAdmin) {
      await AdminUser.create({
        username: "admin",
        email: "selvaganapathims007@gmail.com",
        password: "Admin@1234",
        role: "superadmin",
      });
      console.log("✅ Admin user seeded");
    }

    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(seedProjects);
      console.log(`✅ Seeded ${seedProjects.length} projects`);
    }
  } catch (err) {
    console.error("⚠️  Auto-seed error:", err.message);
  }
}

module.exports = autoSeed;
