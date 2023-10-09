import './globals.css'
import '@/styles/globals.sass'
import 'react-calendar/dist/Calendar.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'

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
						href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
					/>
					<link rel="shortcut icon" href="/images/favicon.ico" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="theme-color" content="#990000" />
					<meta name="description" content="ECIJG" />
				</head>
      <body className={inter.className}>
      <footer className="text-default-white bg-primary p-6 text-center z-40 w-full fixed bottom-0 left-0">
						<p>
							Todos los derechos reservados ©2023 - Escuela Colombiana de
							Ingeniería Julio Garavito. Personería Jurídica 086 de enero 19 de
							1973. Renovación de Acreditación Institucional de Alta Calidad.
							Resolución 002710 del 18 de marzo de 2019 (vigencia de 6 años).
							Vigilada por Mineducación.
						</p>
					</footer>
					<Providers>{children}</Providers>
      </body>
    </html>
  )
}
