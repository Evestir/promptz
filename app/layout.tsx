import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/ui/theme-provider"
import NavBar from '@/components/ui/navigation-bar'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Promptz!',
  description: 'Find some cool prompts!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <NavBar />
          {children}
          <Image src={"https://appstorrent.ru/templates/appstorrent-25c9c1746c/assets/img/bg.webp"} alt='' className="w-full opacity-10 blur-sm -z-50" fill/>
        </ThemeProvider>
      </body>
    </html>
  )
}
