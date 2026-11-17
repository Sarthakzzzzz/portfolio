'use client'

import { useState } from 'react'
import { portfolioData } from 'app/data/portfolio'
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({form,captchaToken}),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }

        setSent(true);

        setForm({
            name: "",
            email: "",
            subject: "",
            message: "",
        });

    } catch (err) {
        setError(
            err instanceof Error
                ? err.message
                : "Failed to send message"
        );
    } finally {
        setLoading(false);
        setCaptchaToken("");
        setCaptchaKey((prev) => prev + 1);
    }
  };

  const inputClass =
    'w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition'

  return (
    <section className="max-w-xl py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 mb-2">
        Get in Touch
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
        Fill out the form below and it will open your email client with the message pre-filled.
      </p>

      {sent ? (
        <div className="rounded-md border border-neutral-200 dark:border-neutral-800 p-6 text-center">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50 mb-1">Message sent successfully!</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">I'll get back to you soon. You can also reach me at{' '}
            <a href={`mailto:${portfolioData.socials.email}`} className="underline underline-offset-4">
              {portfolioData.socials.email}
            </a>.
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-4 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-4"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Name</label>
              <input
                required
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Your Email</label>
              <input
                required
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Subject</label>
            <input
              required
              type="text"
              placeholder="Internship Opportunity / Collaboration / ..."
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Message</label>
            <textarea
              required
              rows={6}
              placeholder="Write your message here..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass + ' resize-none'}
            />
          </div>
          <div className="flex justify-start">
            <Turnstile
              key={captchaKey}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken("")}
              onError={() => setCaptchaToken("")}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !captchaToken}
            className="w-full rounded-md bg-neutral-900 dark:bg-neutral-50 px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 disabled:opacity-50 transition-colors">
            {loading ? "Sending..." : "Send Message"}
            {error && (<p className="text-sm text-red-500" role="alert">{error}</p>)}
          </button>
        </form>
      )}

      <div className="mt-10 pt-8 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
        <a href={`mailto:${portfolioData.socials.email}`} className="hover:text-neutral-900 dark:hover:text-neutral-100">
          {portfolioData.socials.email}
        </a>
        {portfolioData.socials.linkedin && (
          <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100">
            LinkedIn
          </a>
        )}
        {portfolioData.socials.github && (
          <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100">
            GitHub
          </a>
        )}
      </div>
    </section>
  )
}
