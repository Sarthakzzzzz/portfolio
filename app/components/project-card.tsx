import type { Project } from 'app/data/portfolio'

export function ProjectCard({ project }: { project: Project }) {
  const primaryUrl = project.github || project.demo

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/60 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-xl dark:hover:shadow-neutral-950/80 overflow-hidden min-h-[340px]">
      {/* Subtle Radial Glow */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-neutral-200/40 dark:bg-neutral-800/30 blur-2xl pointer-events-none transition-all duration-500 group-hover:scale-150 group-hover:bg-neutral-300/40 dark:group-hover:bg-neutral-700/20" />

      {/* Top Header & Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
              {project.title}
            </h3>
            {project.category && (
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                {project.category}
              </span>
            )}
          </div>

          {primaryUrl && (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          )}
        </div>

        {project.year && (
          <p className="text-xs font-mono text-neutral-500 dark:text-neutral-500 mb-3">
            {project.year}
          </p>
        )}

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-5 mb-6">
          {project.description}
        </p>
      </div>

      {/* Bottom Tech Tags & Action Footer */}
      <div className="relative z-10 mt-auto pt-2">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200 dark:border-neutral-800/90 bg-neutral-100 dark:bg-neutral-900/90 px-2.5 py-0.5 text-[11px] font-mono text-neutral-700 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Status / Deep Dive Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 text-xs font-mono">
          <div className="inline-flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-[11px]">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span>{project.deepDiveStatus || 'Deep dive coming soon'}</span>
          </div>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                Source
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
