import type { Metadata } from 'next'
import './globals.css'
import { barlowCondensed, jetbrainsMono } from "./fonts";

export const metadata: Metadata = {
  title: 'Anugerah Rachmat Indriansyah | Fullstack Developer & Project Manager',
  description: 'Building purposeful digital experiences — from interface to infrastructure',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${barlowCondensed.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans selection:bg-primary/30">{children}</body>
    </html>
  )
}