import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout/Layout'
import { AppProviders } from '@/components/Providers'
import { cn } from '@/lib/utils'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce filter application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'overflow-hidden')}>
        <AppProviders>
          <Layout>{children}</Layout>
        </AppProviders>
      </body>
    </html>
  )
}
