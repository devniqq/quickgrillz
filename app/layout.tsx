import type { Metadata, Viewport } from 'next'
import { Geist, Unbounded } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded', weight: ['400', '600', '800'] })

export const metadata: Metadata = {
  title: 'Quickgrillz – Custom Grillz in Gold, Chrom & Iced Out',
  description:
    'Quickgrillz: Maßgefertigte Grillz in Chrom, 10K, 14K & 18K Gold. Single Cap, Double Cap, Top & Bottom 6/8/10 oder komplett individuell im 3D-Konfigurator gestalten.',
  icons: {
    icon: [
      { url: `${base}/icon-light-32x32.png`, media: '(prefers-color-scheme: light)' },
      { url: `${base}/icon-dark-32x32.png`, media: '(prefers-color-scheme: dark)' },
      { url: `${base}/icon.svg`, type: 'image/svg+xml' },
    ],
    apple: `${base}/apple-icon.png`,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0b0c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${geist.variable} ${unbounded.variable} bg-background`}>
      <body className="antialiased">
        {children}
        <Toaster theme="dark" position="bottom-center" />
      </body>
    </html>
  )
}
