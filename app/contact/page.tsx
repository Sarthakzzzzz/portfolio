'use client'

import { useState } from 'react'
import { portfolioData } from 'app/data/portfolio'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Hi Sarthak,\n\nMy name is ${form.name} (${form.email}).\n\n${form.message}`
    const mailto = `mailto:${portfolioData.socials.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSent(true)
  }

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
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50 mb-1">Your email client should have opened.</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">If it didn't,{' '}
            <a href={`mailto:${portfolioData.socials.email}`} className="underline underline-offset-4">
              click here to email directly
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

          <button
            type="submit"
            className="w-full rounded-md bg-neutral-900 dark:bg-neutral-50 px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
          >
            Send Message
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
