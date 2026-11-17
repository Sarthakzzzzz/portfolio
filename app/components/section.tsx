import React from 'react'

interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section 
      id={id} 
      className="py-8 sm:py-12 border-t border-neutral-200 dark:border-neutral-800 first:border-t-0 scroll-mt-20"
    >
      <h2 className="text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400 mb-8 uppercase">
        {title}
      </h2>
      <div className="text-neutral-700 dark:text-neutral-300">
        {children}
      </div>
    </section>
  )
}
