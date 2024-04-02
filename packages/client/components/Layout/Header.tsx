'use client'
import Link from 'next/link'
import { HeartIcon, UserIcon } from 'lucide-react'
import { CartLink } from '../Cart/CartLink'

export default function Header() {
  return (
    <header className="relative w-full">
      <div className="h-[50px] w-[1200px] flex items-center mx-auto border-b">
        <Link href="/" className="font-semibold ml-3 xl:ml-0">
          Market
        </Link>

        <div className="ml-auto pr-3 xl:pr-0">
          <div className="flex items-center justify-between space-x-5">
            <div className="flex items-center h-[40px]">
              <UserIcon className="w-4 h-4" />
              <p className="pl-1 text-sm">Hesabım</p>
            </div>
            <div className="flex items-center h-[40px]">
              <HeartIcon className="w-4 h-4" />
              <p className="pl-1 text-sm">Favorilerim</p>
            </div>
            <CartLink />
          </div>
        </div>
      </div>
    </header>
  )
}
