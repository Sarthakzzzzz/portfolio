# Sarthak Pujari — Portfolio

Personal portfolio site built with Next.js 15, Tailwind v4, and MDX.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Content**: MDX / Markdown blog posts
- **Font**: Geist
- **Analytics**: Vercel Speed Insights & Web Analytics

## Features

- Blog with MDX support and syntax highlighting
- Projects carousel
- Experience, Education, Skills & Achievements sections
- Dynamic OG images
- RSS Feed & Sitemap
- SEO optimized (JSON-LD schema, robots.txt)
- Dark / Light mode toggle

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── blog/          # Blog listing + MDX post pages
├── components/    # UI components (nav, dock, mdx, etc.)
├── data/          # portfolio.ts — single source of truth for all content
├── og/            # Dynamic OG image route
├── rss/           # RSS feed route
├── contact/       # Contact page
└── page.tsx       # Home page
public/
├── images/        # Profile photo
├── certificates/  # Achievement certificates
└── resume.pdf
```

## Customization

All personal data (bio, projects, experience, skills, achievements, socials) lives in [`app/data/portfolio.ts`](app/data/portfolio.ts). Edit that file to update the site content.

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` to trigger a deploy.
