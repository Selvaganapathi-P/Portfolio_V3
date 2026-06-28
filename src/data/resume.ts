/**
 * Single source of truth — extracted from resume PDF.
 * All portfolio pages derive their content from this file.
 */

export const personal = {
  name: "Selvaganapathi P",
  initials: "SP",
  title: "Full Stack Engineer",
  tagline: "Building scalable MERN applications with clean architecture and real-world impact.",
  location: "Dharmapuri, Tamil Nadu, India",
  email: "selvaganapathims007@gmail.com",
  phone: "+91 9345760278",
  available: true,
  availabilityNote: "Open to full-time roles & freelance",
  currentFocus: "Full Stack & MERN Development",
  yearsOfExperience: 1,
  github: "https://github.com/Selvaganapathi-P",
  linkedin: "https://linkedin.com/in/selvaganapathims",
  portfolio: "https://gle-studio.vercel.app",
  social: {
    github: "https://github.com/Selvaganapathi-P",
    linkedin: "https://linkedin.com/in/selvaganapathims",
  },
  summary:
    "MERN Stack Developer with hands-on experience in building scalable and responsive web applications using MongoDB, Express.js, React, and Node.js. Skilled in developing RESTful APIs, implementing authentication systems, and handling dynamic data rendering using modern React hooks. Strong problem-solving abilities with a focus on clean code, performance optimization, and delivering efficient real-world solutions.",
};

export const education = [
  {
    id: "rp-sarathy",
    institution: "R P Sarathy Institute of Technology",
    degree: "B.Tech Information Technology",
    startDate: "Sept 2021",
    endDate: "May 2025",
    cgpa: "8.1/10.0",
    coursework: [
      "Web Development",
      "Database Management System",
      "Computer Networks",
    ],
    location: "Tamil Nadu, India",
  },
];

export const experience = [
  {
    id: "gt-software",
    company: "GT Software",
    role: "MERN Stack Intern",
    type: "Internship",
    location: "Coimbatore, Tamil Nadu",
    startDate: "December 2025",
    endDate: "April 2026",
    current: false,
    description:
      "Built production-quality web applications including authentication pages and dashboards using modern MERN stack practices.",
    responsibilities: [
      "Developed responsive user interfaces and web applications, including authentication pages and dashboards with modern UI practices.",
      "Integrated REST APIs and managed dynamic data flow using React hooks for efficient state and lifecycle handling.",
      "Worked with MongoDB and Mongoose for schema design, CRUD operations, and data querying in full-stack applications.",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "REST API", "JavaScript"],
    impact: [
      "Delivered production-ready UI components used across multiple projects",
      "Improved API integration patterns with reusable React hooks",
      "Contributed to schema design for scalable MongoDB data models",
    ],
  },
];

export const projects = [
  {
    id: "ecommerce-website",
    slug: "ecommerce-website",
    title: "E-commerce Website",
    subtitle: "Full-Stack E-Commerce & Expense Tracking Platform",
    description:
      "A full-stack e-commerce and expense tracking application built with MongoDB, featuring JWT authentication, secure user management, data visualization, and role-based admin access.",
    longDescription:
      "A comprehensive full-stack application combining e-commerce functionality with expense tracking. The platform features a secure JWT-based authentication system, role-based access control for admins and users, a data visualization dashboard built with Recharts, and file upload capabilities using Multer. The admin dashboard provides complete control over products, orders, and user management.",
    github: "https://github.com/Selvaganapathi-P/ecommerce-expense",
    live: null,
    status: "completed" as const,
    featured: true,
    category: "Full Stack",
    year: 2024,
    problem:
      "Businesses needed a unified platform combining e-commerce product management with personal or business expense tracking — reducing the need for multiple separate tools.",
    solution:
      "Built a MERN stack monorepo with separate admin and user portals sharing a single MongoDB backend. JWT tokens secure every route, and Recharts visualizes spending trends and sales analytics in real time.",
    architecture:
      "React SPA frontend communicates with an Express.js REST API server. MongoDB stores all data with Mongoose schemas enforcing data integrity. JWT middleware protects routes. Multer handles multi-part file uploads stored on the server.",
    challenges: [
      "Implementing granular role-based access without a heavy auth library",
      "Real-time chart updates reflecting live data changes",
      "Efficient MongoDB aggregation pipelines for expense analytics",
    ],
    metrics: {
      features: "10+",
      apiRoutes: "25+",
      components: "30+",
    },
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Multer",
      "Recharts",
      "CSS",
    ],
    features: [
      "JWT Authentication & Authorization",
      "Role-Based Access Control (Admin / User)",
      "Product Management & CRUD",
      "Expense Tracker with Categories",
      "Data Visualization with Recharts",
      "File Upload with Multer",
      "Admin Dashboard",
      "Order Management",
      "Secure API Routes",
    ],
  },
  {
    id: "studiopro",
    slug: "studiopro",
    title: "Studiopro",
    subtitle: "Photography Studio Booking & Management Platform",
    description:
      "A full-stack photography studio platform with secure authentication, role-based admin/user access, complete booking and order system, and a feature-rich admin dashboard.",
    longDescription:
      "Studiopro is a production-deployed photography studio management platform. It enables clients to browse gallery portfolios, book sessions, and manage orders — while providing studio owners a powerful admin dashboard to manage staff, gallery uploads, client data, and analytics. The platform features responsive UI with smooth animations and real-time settings.",
    github: null,
    live: "https://gle-studio.vercel.app/",
    status: "live" as const,
    featured: true,
    category: "Full Stack",
    year: 2025,
    problem:
      "Photography studios were managing bookings, galleries, staff, and client communications through disconnected tools — leading to scheduling conflicts and poor client experience.",
    solution:
      "Designed and deployed a purpose-built MERN platform with distinct admin and client interfaces. Booking workflows are enforced through the backend, gallery uploads are gated behind roles, and all analytics aggregate from real user actions.",
    architecture:
      "Deployed on Vercel (frontend) with an Express.js API server. MongoDB Atlas stores all studio data. JWT with HTTP-only cookies handles sessions. Multer + cloud storage manages photo uploads. Recharts powers the analytics dashboard.",
    challenges: [
      "Building a real-time booking availability system without race conditions",
      "Designing a flexible gallery management system supporting bulk uploads",
      "Implementing smooth UI animations without sacrificing performance",
    ],
    metrics: {
      deployed: "Live on Vercel",
      features: "15+",
      dashboardModules: "6",
    },
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Multer",
      "Recharts",
      "CSS",
      "Vercel",
    ],
    features: [
      "Secure JWT Authentication",
      "Role-Based Admin & User Access",
      "Photography Booking System",
      "Order Management",
      "Gallery Management with Uploads",
      "Staff Management Module",
      "Client Management",
      "Analytics Dashboard",
      "Real-Time Settings",
      "Responsive UI with Animations",
      "File Upload Support",
    ],
  },
  {
    id: "cinevault",
    slug: "cinevault",
    title: "CineVault",
    subtitle: "Real-Time Cinema Seat Booking Application",
    description:
      "A full-stack cinema booking application with real-time seat selection, dynamic filtering, interactive seat maps with tier-based pricing, and live availability tracking.",
    longDescription:
      "CineVault is a cinema booking platform that replicates the core experience of booking movie tickets online. Users can browse movies, select showtimes, and interact with an animated seat map that shows live availability. Tier-based pricing (Gold, Silver, General) is enforced client-side and reflected in real-time totals. LocalStorage persists booking sessions without requiring a backend.",
    github: null,
    live: "https://cinevalutzone.netlify.app",
    status: "live" as const,
    featured: true,
    category: "Frontend",
    year: 2024,
    problem:
      "Most cinema booking UI demos are static mockups. Building one with actual real-time seat state, tier pricing logic, and dynamic filtering exposed real frontend engineering challenges.",
    solution:
      "Built a React application with a custom seat-map engine. Seat availability is managed in component state with LocalStorage persistence. Filtering by movie, show time, and seat tier updates the map reactively. REST APIs provide movie data.",
    architecture:
      "Pure React SPA. No backend — all booking state is managed with React state and persisted to LocalStorage. REST APIs provide movie listing data. CSS3 animations drive the interactive seat map visualization.",
    challenges: [
      "Building an efficient seat-map rendering engine that scales to 200+ seats",
      "Implementing tier-based pricing with accurate real-time totals",
      "Dynamic filtering without performance degradation on large datasets",
    ],
    metrics: {
      deployed: "Live on Netlify",
      seatsRendered: "200+",
      pricingTiers: "3",
    },
    techStack: ["React", "JavaScript", "CSS3", "LocalStorage", "REST APIs"],
    features: [
      "Real-Time Seat Selection",
      "Interactive Animated Seat Map",
      "Tier-Based Pricing (Gold / Silver / General)",
      "Live Availability Tracking",
      "Dynamic Movie & Showtime Filtering",
      "Booking Summary & Confirmation",
      "Persistent Booking State",
      "Responsive Mobile Layout",
    ],
  },
];

export const skills = {
  languages: [
    { name: "JavaScript", level: 90, category: "language" },
  ],
  frontend: [
    { name: "React.js", level: 88, category: "frontend" },
    { name: "HTML5", level: 92, category: "frontend" },
    { name: "CSS3", level: 85, category: "frontend" },
    { name: "Recharts", level: 75, category: "frontend" },
  ],
  backend: [
    { name: "Node.js", level: 82, category: "backend" },
    { name: "Express.js", level: 82, category: "backend" },
    { name: "REST API Design", level: 85, category: "backend" },
    { name: "JWT Auth", level: 80, category: "backend" },
  ],
  database: [
    { name: "MongoDB", level: 83, category: "database" },
    { name: "Mongoose", level: 82, category: "database" },
  ],
  tools: [
    { name: "Firebase Auth", level: 72, category: "tools" },
    { name: "Multer", level: 75, category: "tools" },
    { name: "Git", level: 78, category: "tools" },
    { name: "Vercel", level: 80, category: "tools" },
    { name: "Netlify", level: 75, category: "tools" },
    { name: "Postman", level: 78, category: "tools" },
  ],
};

export const techStack = [
  { name: "JavaScript", icon: "js", color: "#F7DF1E", category: "language" },
  { name: "React.js", icon: "react", color: "#61DAFB", category: "frontend" },
  { name: "Node.js", icon: "nodejs", color: "#339933", category: "backend" },
  { name: "Express.js", icon: "express", color: "#ffffff", category: "backend" },
  { name: "MongoDB", icon: "mongodb", color: "#47A248", category: "database" },
  { name: "Mongoose", icon: "mongoose", color: "#880000", category: "database" },
  { name: "JWT", icon: "jwt", color: "#D63AFF", category: "security" },
  { name: "Firebase", icon: "firebase", color: "#FFCA28", category: "tools" },
  { name: "Multer", icon: "multer", color: "#FF6B35", category: "tools" },
  { name: "Recharts", icon: "recharts", color: "#22C55E", category: "frontend" },
  { name: "REST API", icon: "api", color: "#0EA5E9", category: "backend" },
  { name: "Git", icon: "git", color: "#F05032", category: "tools" },
  { name: "Vercel", icon: "vercel", color: "#ffffff", category: "tools" },
  { name: "Netlify", icon: "netlify", color: "#00C7B7", category: "tools" },
  { name: "CSS3", icon: "css", color: "#1572B6", category: "frontend" },
  { name: "HTML5", icon: "html", color: "#E34F26", category: "frontend" },
];

export const stats = [
  { label: "Projects Built", value: "3+", suffix: "" },
  { label: "Months of Experience", value: "5", suffix: "mo" },
  { label: "Technologies", value: "15+", suffix: "" },
  { label: "CGPA", value: "8.1", suffix: "/10" },
];

export const services = [
  {
    title: "Full Stack Web Development",
    description: "End-to-end MERN stack applications with clean architecture, REST APIs, and scalable database design.",
    icon: "Code",
  },
  {
    title: "REST API Development",
    description: "Robust Express.js APIs with JWT authentication, input validation, and MongoDB data persistence.",
    icon: "Server",
  },
  {
    title: "Database Design",
    description: "MongoDB schema design with Mongoose, optimized queries, aggregation pipelines, and CRUD operations.",
    icon: "Database",
  },
  {
    title: "Frontend Engineering",
    description: "Responsive React applications with hooks, context API, and modern state management patterns.",
    icon: "Layout",
  },
  {
    title: "Authentication Systems",
    description: "Secure JWT and Firebase authentication with role-based access control and session management.",
    icon: "Shield",
  },
  {
    title: "Admin Dashboards",
    description: "Feature-rich admin panels with analytics, data visualization using Recharts, and file management.",
    icon: "BarChart",
  },
];

export const resumeText = `
Selvaganapathi P
MERN Stack Developer | Full Stack Engineer

Location: Dharmapuri, Tamil Nadu, India
Email: selvaganapathims007@gmail.com
Phone: +91 9345760278
GitHub: github.com/Selvaganapathi-P
LinkedIn: linkedin.com/in/selvaganapathims

SUMMARY:
MERN Stack Developer with hands-on experience in building scalable and responsive web applications using MongoDB, Express.js, React, and Node.js. Skilled in developing RESTful APIs, implementing authentication systems, and handling dynamic data rendering using modern React hooks. Strong problem-solving abilities with a focus on clean code, performance optimization, and delivering efficient real-world solutions.

EDUCATION:
R P Sarathy Institute of Technology
B.Tech Information Technology | Sept 2021 – May 2025
CGPA: 8.1/10.0
Coursework: Web Development, Database Management System, Computer Networks

EXPERIENCE:
MERN Stack Intern | GT Software | Coimbatore | DEC 2025 – APR 2026
- Developed responsive user interfaces and web applications, including authentication pages and dashboards with modern UI practices.
- Integrated REST APIs and managed dynamic data flow using React hooks for efficient state and lifecycle handling.
- Worked with MongoDB and Mongoose for schema design, CRUD operations, and data querying in full-stack applications.

PROJECTS:
1. E-commerce Website (github.com/Selvaganapathi-P/ecommerce-expense)
- Full-stack e-commerce and expense tracking application using MongoDB
- JWT authentication and secure user management
- Expense tracker with data visualization and admin dashboard with RBAC
- Tech: React.js, Node.js, Express.js, MongoDB, Mongoose, JWT, Multer, Recharts, CSS

2. Studiopro (gle-studio.vercel.app)
- Full-stack photography studio platform with secure authentication and role-based admin/user access
- Complete booking and order system
- Admin dashboard for managing gallery, staff, and clients with analytics
- Real-time settings, responsive UI, animations, and file uploads
- Tech: React.js, Node.js, Express.js, MongoDB, JWT, Multer, Recharts, CSS

3. CineVault (cinevalutzone.netlify.app)
- Full-stack cinema booking application with real-time seat selection and dynamic filtering
- Interactive seat map with tier-based pricing and live availability tracking
- Tech: React, JavaScript, CSS3, LocalStorage, REST APIs

SKILLS:
Languages: JavaScript
Frameworks: React.js, Node.js, Express.js
Database: MongoDB
Tools: Firebase Authentication, REST API, Multer, Recharts, JWT, Git, Vercel, Netlify

WHAT I AM GOOD AT:
- Building MERN Stack applications from scratch
- REST API design and implementation
- MongoDB schema design and aggregation
- React hooks and state management
- JWT authentication and security
- Role-based access control
- Data visualization with Recharts
- Responsive frontend development
- File upload systems with Multer

SUITABLE COMPANIES:
Selvaganapathi is well-suited for startups and mid-size companies building MERN stack products, SaaS platforms, e-commerce systems, booking platforms, and admin dashboards. His hands-on project experience and internship at GT Software demonstrate the ability to ship production-ready code.
`;
