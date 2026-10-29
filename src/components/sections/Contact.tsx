"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { contactSchema } from "@/lib/contact";
import { useGame } from "@/components/game/GameContext";
import { PixelDoor, PixelFlag } from "@/components/pixel/sprites";

const EMPTY = { name: "", email: "", subject: "", message: "", company: "" };
type Field = "name" | "email" | "subject" | "message";

const LINKS = [
  ["Email", profile.email],
  ["GitHub", profile.links.github],
  ["LinkedIn", profile.links.linkedin],
  ["Location", profile.location],
] as const;

export function Contact() {
  const { play } = useGame();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      play("click");
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
        if (key === "name" || key === "email" || key === "subject" || key === "message") next[key] = issue.message;
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
      play("level");
    } catch {
      setStatus("error");
      setError("The message could not be sent.");
    }
  }

  return (
    <section id="level-05" className="level">
      <p className="level-kicker">Level 05</p>
      <h2>Final boss</h2>
      <div className="boss-scene" aria-hidden="true">
        <PixelFlag className="decor" />
        <PixelDoor className="decor door-prop" />
      </div>
      <div className="contact-layout">
        <form className="dialogue" onSubmit={onSubmit} noValidate>
          <p className="prompt">What message do you wish to send, traveler?</p>
          {(["name", "email", "subject", "message"] as const).map((field) => (
            <label key={field} className="pixel-field">
              <span>{field}</span>
              {field === "message" ? (
                <textarea
                  name={field}
                  rows={4}
                  value={values[field]}
                  aria-invalid={Boolean(errors[field])}
                  onChange={(event) => setValues({ ...values, [field]: event.target.value })}
                />
              ) : (
                <input
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  autoComplete={field === "email" ? "email" : field === "name" ? "name" : "off"}
                  value={values[field]}
                  aria-invalid={Boolean(errors[field])}
                  onChange={(event) => setValues({ ...values, [field]: event.target.value })}
                />
              )}
              {errors[field] ? (
                <span className="pixel-error" role="alert">
                  !! {errors[field]}
                </span>
              ) : null}
            </label>
          ))}
          <label className="honeypot" aria-hidden="true">
            Company
            <input
              tabIndex={-1}
              autoComplete="off"
              value={values.company}
              onChange={(event) => setValues({ ...values, company: event.target.value })}
            />
          </label>
          <button type="submit" className="start-btn" disabled={status === "sending"}>
            {status === "sending" ? "SENDING..." : "SEND"}
          </button>
          {status === "sent" ? (
            <p className="delivered" role="status">
              MESSAGE DELIVERED ★
            </p>
          ) : null}
          {status === "error" ? (
            <p className="pixel-error" role="alert">
              !! {error}
            </p>
          ) : null}
        </form>
        <aside className="pixel-window">
          <div className="window-bar">
            <span>DIRECT</span>
          </div>
          <ul className="window-body copy-list">
            {LINKS.map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <span>{value}</span>
                <button type="button" onClick={() => copy(value, label)}>
                  {copied === label ? "COPIED" : "COPY"}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <div className="ground" aria-hidden="true" />
    </section>
  );
}
