'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProjectCard } from 'app/components/project-card'
import type { Project } from 'app/data/portfolio'

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const total = projects.length
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total])
  const prev = () => setCurrent((i) => (i - 1 + total) % total)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [paused, next])

  // On mobile show 1, tablet 2, desktop 3
  const visibleCount = 3
  const indices = [0, 1, 2].map((offset) => (current + offset) % total)

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Mobile: single card, md: 2, lg: 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Mobile shows only current card */}
        <div className="md:hidden transition-opacity duration-500">
          <ProjectCard project={projects[current]} />
        </div>
        {/* md+ shows 2-3 cards */}
        {indices.slice(0, 2).map((idx, pos) => (
          <div key={`${idx}-${pos}`} className="hidden md:block lg:hidden transition-opacity duration-500">
            <ProjectCard project={projects[idx]} />
          </div>
        ))}
        {indices.map((idx, pos) => (
          <div key={`lg-${idx}-${pos}`} className="hidden lg:block transition-opacity duration-500">
            <ProjectCard project={projects[idx]} />
          </div>
        ))}
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={prev}
          className="rounded-full p-2.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          aria-label="Previous project"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPaused(true) }}
              aria-label={`Go to project ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-5 h-2 bg-neutral-900 dark:bg-neutral-100'
                  : 'w-2 h-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="rounded-full p-2.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          aria-label="Next project"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
