import { Section } from 'app/components/section'
import { ProjectsCarousel } from 'app/components/projects-carousel'
import { portfolioData } from 'app/data/portfolio'

export default function Page() {
  return (
    <div className="space-y-4" id="top">
      {/* Hero Header — dot field visible here */}
      <section className="py-12 md:py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3 sm:text-4xl">
          {portfolioData.name}
        </h1>
        <p className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-6 tracking-tight">
          {portfolioData.subtitle}
        </p>
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
          {portfolioData.bio}
        </p>
      </section>

      <Section id="about" title="About">
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            {portfolioData.longBio}
          </p>
        </Section>

        <Section id="experience" title="Experience">
          <div className="space-y-10">
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="group relative">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                    {exp.role} @ <span className="font-bold">{exp.company}</span>
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    {exp.period} | {exp.location}
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">{bullet}</li>
                  ))}
                </ul>
                {exp.tags && (
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <ProjectsCarousel projects={portfolioData.projects} />
        </Section>

        <Section id="education" title="Education">
          <div className="space-y-8">
            {portfolioData.education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                    {edu.degree} in {edu.major}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    {edu.period} | {edu.location}
                  </span>
                </div>
                <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                  {edu.institution} {edu.gpa && <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono"> (GPA: {edu.gpa})</span>}
                </div>
                {edu.details && (
                  <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                    {edu.details.map((detail, dIdx) => (
                      <li key={dIdx} className="leading-relaxed">{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="space-y-4">
            {portfolioData.skills.map((skillGroup, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 w-full sm:w-1/4 uppercase tracking-widest font-mono">
                  {skillGroup.category}
                </span>
                <div className="flex flex-wrap gap-1.5 sm:w-3/4">
                  {skillGroup.skills.map((skill) => (
                    <span key={skill} className="text-xs px-2.5 py-1 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="achievements" title="Achievements">
          <div className="space-y-8">
            {portfolioData.achievements.map((ach, idx) => (
              <div key={idx}>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    {ach.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    {ach.date}
                  </span>
                </div>
                {ach.issuer && (
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-medium">
                    Issued by {ach.issuer}
                  </div>
                )}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {ach.description}
                </p>
                {ach.certificateUrl && (
                  <a
                    href={ach.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700"
                  >
                    View Certificate ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="space-y-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
              Feel free to reach out if you want to collaborate on research, software projects, or discuss competitive programming and algorithm optimizations.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono pt-3">
              {portfolioData.socials.email && (
                <a href={`mailto:${portfolioData.socials.email}`} className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50 underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-4">
                  {portfolioData.socials.email}
                </a>
              )}
              {portfolioData.socials.github && (
                <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50 underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-4">
                  GitHub
                </a>
              )}
              {portfolioData.socials.linkedin && (
                <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50 underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-4">
                  LinkedIn
                </a>
              )}
              {portfolioData.socials.codeforces && (
                <a href={portfolioData.socials.codeforces} target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50 underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-4">
                  Codeforces
                </a>
              )}
              {portfolioData.socials.leetcode && (
                <a href={portfolioData.socials.leetcode} target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50 underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-4">
                  LeetCode
                </a>
              )}
            </div>
          </div>
        </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: portfolioData.name,
            url: 'https://portfolio-blog-starter.vercel.app',
            jobTitle: portfolioData.title,
            sameAs: Object.values(portfolioData.socials).filter(Boolean),
            knowsAbout: portfolioData.skills.flatMap((s) => s.skills),
          }),
        }}
      />
    </div>
  )
}
