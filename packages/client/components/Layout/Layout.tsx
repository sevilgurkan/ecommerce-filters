'use client'
import type { PropsWithChildren } from 'react'
import Header from './Header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col overflow-y-auto h-full w-full">
      <Header />
      <main>{children}</main>
    </div>
  )
}
