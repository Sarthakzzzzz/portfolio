'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Classic } from './classic-theme-toggle'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

function ThemeToggle() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored ? stored === 'dark' : prefersDark
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  if (!mounted) return <div className="w-6 h-6" />

  return (
    <Classic
      onClick={toggle}
      className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors text-xl cursor-pointer"
    />
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false)
    // On home page, handle hash scrolling
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault()
      const id = href.replace('/#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/85 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/85">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
        >
          Sarthak Pujari
        </Link>

        {/* Right: Nav + theme toggle */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            >
              {item.name}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800" id="mobile-menu">
          <div className="space-y-1 px-4 py-3 bg-white dark:bg-neutral-950">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="block rounded-md px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
