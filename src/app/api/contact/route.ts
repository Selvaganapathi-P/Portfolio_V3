import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("[contact] RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:     "Portfolio Contact <onboarding@resend.dev>",
        to:       ["selvaganapathims007@gmail.com"],
        reply_to: data.email,
        subject:  `[Portfolio] ${data.subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto">
            <h2 style="color:#7c3aed">New Portfolio Message</h2>
            <p><b>Name:</b> ${data.name}</p>
            <p><b>Email:</b> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><b>Subject:</b> ${data.subject}</p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
            <p style="white-space:pre-wrap">${data.message}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[contact] Resend error:", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", details: error.errors }, { status: 400 });
    }
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
