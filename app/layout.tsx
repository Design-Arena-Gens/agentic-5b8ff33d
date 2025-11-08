import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bharat Life Care - Social Media Manager',
  description: 'AI-powered social media management system for Bharat Life Care',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
