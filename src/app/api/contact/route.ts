import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact";
import { profile } from "@/data/profile";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Check the form fields." },
      { status: 400 },
    );
  }

  if (parsed.data.company?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "TODO: set RESEND_API_KEY before this form can send mail." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";

  const sent = await resend.emails.send({
    from,
    to,
    replyTo: parsed.data.email,
    subject: `[portfolio] ${parsed.data.subject}`,
    text: `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
  });

  if (sent.error) {
    return NextResponse.json({ ok: false, error: "The mail service rejected the message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
