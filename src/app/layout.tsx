import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Administración de co-working',
  description: 'App Web para adminisración de espacios Co-Working',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
					/>
					<link rel="shortcut icon" href="/images/favicon.ico" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="theme-color" content="#990000" />
					<meta name="description" content="ECIJG" />
				</head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
