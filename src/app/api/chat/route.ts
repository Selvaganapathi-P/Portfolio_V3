import { NextRequest, NextResponse } from "next/server";
import { resumeText } from "@/data/resume";

const SYSTEM_PROMPT = `You are an AI assistant for Selvaganapathi P's portfolio website.
Answer questions about him based ONLY on the resume context provided below.
Be concise, professional, and helpful. Use a friendly but professional tone.
If asked something not in the resume, say you don't have that information but offer to help with what you do know.
Do not make up information. Keep responses under 150 words.

RESUME CONTEXT:
${resumeText}`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // If no API key, use smart fallback responses
    if (!apiKey) {
      const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
      const response = generateFallbackResponse(lastMessage);
      return NextResponse.json({ content: response });
    }

    // Use Anthropic Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-6), // Last 6 messages for context
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || "I couldn't generate a response.";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { content: "I'm having trouble right now. Please email selvaganapathims007@gmail.com directly." },
      { status: 200 }
    );
  }
}

function generateFallbackResponse(query: string): string {
  if (query.includes("experience") || query.includes("work") || query.includes("intern")) {
    return "Selvaganapathi worked as a MERN Stack Intern at GT Software (Coimbatore) from December 2025 to April 2026. He built responsive UIs, integrated REST APIs using React hooks, and worked with MongoDB and Mongoose for full-stack applications.";
  }
  if (query.includes("project")) {
    return "Selvaganapathi has built 3 production projects: (1) E-commerce Website with expense tracking & RBAC (2) Studiopro — a live photography studio booking platform on Vercel (3) CineVault — a real-time cinema seat booking app on Netlify. All built with MERN stack.";
  }
  if (query.includes("skill") || query.includes("tech") || query.includes("know") || query.includes("stack")) {
    return "Selvaganapathi specializes in the MERN stack: MongoDB, Express.js, React.js, Node.js. He also works with JWT authentication, Mongoose, Multer for file uploads, Recharts for visualization, Firebase Auth, REST APIs, and has deployed apps on Vercel and Netlify.";
  }
  if (query.includes("available") || query.includes("hire") || query.includes("open") || query.includes("job")) {
    return "Yes! Selvaganapathi is actively open to full-time roles and freelance projects. He's best suited for MERN Stack, Full Stack, or React/Node.js developer positions. You can reach him at selvaganapathims007@gmail.com or via the Contact page.";
  }
  if (query.includes("education") || query.includes("degree") || query.includes("college")) {
    return "Selvaganapathi holds a B.Tech in Information Technology from R P Sarathy Institute of Technology (Sept 2021 – May 2025) with a CGPA of 8.1/10. His coursework included Web Development, Database Management, and Computer Networks.";
  }
  if (query.includes("contact") || query.includes("reach") || query.includes("email")) {
    return "You can reach Selvaganapathi at selvaganapathims007@gmail.com or via the Contact page on this portfolio. He's also on GitHub (Selvaganapathi-P) and LinkedIn (selvaganapathims). He typically responds within 24 hours.";
  }
  if (query.includes("suitable") || query.includes("compan") || query.includes("role")) {
    return "Selvaganapathi is well-suited for Full Stack Developer, MERN Stack Developer, React Developer, or Node.js Backend Developer roles at startups and mid-size companies building SaaS products, e-commerce systems, or booking platforms.";
  }
  return "I can tell you about Selvaganapathi's skills, projects, experience, and contact details. What would you like to know? Try asking about his tech stack, projects, or work experience!";
}
