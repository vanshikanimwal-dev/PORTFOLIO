"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { contactSchema } from "@/lib/contact";
import { CircuitBoard } from "@/components/svg/CircuitBoard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FIELDS = ["name", "email", "subject", "message"] as const;

type Field = (typeof FIELDS)[number];

const EMPTY = { name: "", email: "", subject: "", message: "", company: "" };

export function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [hot, setHot] = useState<string | null>(null);
  const [copied, setCopied] = useState("");

  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
    } catch {
      setCopied("");
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name" || key === "email" || key === "subject" || key === "message") {
          next[key] = issue.message;
        }
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !body.ok) {
        setStatus("error");
        setError(body.error || "The message could not be sent.");
        return;
      }
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("error");
      setError("The message could not be sent.");
    }
  }

  return (
    <section id="contact" className="section relative overflow-hidden">
      <CircuitBoard hot={hot} sent={status === "sent"} />
      <SectionHeading kicker="TRANSMIT" title="Contact" />
      <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form className="grid gap-3" onSubmit={onSubmit} noValidate>
          <label className="field px-3 py-2">
            <span className="text-xs text-hot">NAME</span>
            <input
              name="name"
              autoComplete="name"
              value={values.name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "err-name" : undefined}
              onFocus={() => setHot("name")}
              onBlur={() => setHot(null)}
              onChange={(event) => setValues({ ...values, name: event.target.value })}
            />
          </label>
          {errors.name ? (
            <p id="err-name" className="text-sm text-pink" role="alert">
              {errors.name}
            </p>
          ) : null}
          <label className="field px-3 py-2">
            <span className="text-xs text-hot">EMAIL</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "err-email" : undefined}
              onFocus={() => setHot("email")}
              onBlur={() => setHot(null)}
              onChange={(event) => setValues({ ...values, email: event.target.value })}
            />
          </label>
          {errors.email ? (
            <p id="err-email" className="text-sm text-pink" role="alert">
              {errors.email}
            </p>
          ) : null}
          <label className="field px-3 py-2">
            <span className="text-xs text-hot">SUBJECT</span>
            <input
              name="subject"
              value={values.subject}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "err-subject" : undefined}
              onFocus={() => setHot("subject")}
              onBlur={() => setHot(null)}
              onChange={(event) => setValues({ ...values, subject: event.target.value })}
            />
          </label>
          {errors.subject ? (
            <p id="err-subject" className="text-sm text-pink" role="alert">
              {errors.subject}
            </p>
          ) : null}
          <label className="field px-3 py-2">
            <span className="text-xs text-hot">MESSAGE</span>
            <textarea
              name="message"
              rows={5}
              value={values.message}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "err-message" : undefined}
              onFocus={() => setHot("message")}
              onBlur={() => setHot(null)}
              onChange={(event) => setValues({ ...values, message: event.target.value })}
            />
          </label>
          {errors.message ? (
            <p id="err-message" className="text-sm text-pink" role="alert">
              {errors.message}
            </p>
          ) : null}
          <label className="honeypot" aria-hidden="true">
            Company website
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={values.company}
              onChange={(event) => setValues({ ...values, company: event.target.value })}
            />
          </label>
          <button type="submit" className="neon-btn w-fit" disabled={status === "sending"}>
            {status === "sending" ? "transmitting..." : "Send message"}
          </button>
          {status === "sent" ? (
            <p className="glitch font-display text-3xl text-pink" data-text="MESSAGE SENT ✦" role="status">
              MESSAGE SENT ✦
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-pink" role="alert">
              {error}
            </p>
          ) : null}
        </form>
        <aside className="hud-panel p-5">
          <h3 className="font-display text-3xl">Direct line</h3>
          <ul className="mt-3 space-y-3">
            {[
              ["Email", profile.email],
              ["Phone", profile.phone],
              ["GitHub", profile.links.github],
              ["LinkedIn", profile.links.linkedin],
              ["Location", profile.location],
            ].map(([label, value]) => (
              <li key={label} className="flex items-center justify-between gap-3">
                <span>
                  <span className="block text-xs text-hot">{label}</span>
                  <span className="break-all">{value}</span>
                </span>
                <button type="button" className="neon-btn-ghost neon-btn" onClick={() => copy(value, label)}>
                  {copied === label ? "Copied" : "Copy"}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
