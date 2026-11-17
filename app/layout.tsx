import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { portfolioData } from './data/portfolio'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${portfolioData.name} | ${portfolioData.title}`,
    template: `%s | ${portfolioData.name}`,
  },
  description: portfolioData.bio,
  openGraph: {
    title: `${portfolioData.name} - Portfolio`,
    description: portfolioData.bio,
    url: baseUrl,
    siteName: `${portfolioData.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

import { FloatingDock } from './components/dock'
const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-neutral-950',
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col relative selection:bg-neutral-200 dark:selection:bg-neutral-800">
        <Navbar />
        <main className="flex-auto min-w-0 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-32 bg-white dark:bg-neutral-950 shadow-[0_0_40px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_8px_rgba(0,0,0,0.5)]">
          {children}
          <Footer />
        </main>
        <FloatingDock />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
