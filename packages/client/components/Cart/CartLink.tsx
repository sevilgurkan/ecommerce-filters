'use client'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ShoppingCartIcon } from 'lucide-react'

import { getCartCount } from '@/lib/api'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { CartContainer } from './CartContainer'

export function CartLink() {
  const { data: cartCount, status } = useQuery({
    queryKey: ['cart/count'],
    queryFn: getCartCount,
    staleTime: 0,
  })

  const hasProducts = status === 'success' && cartCount > 0

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href="/cart" className="relative flex items-center h-[40px]">
          <ShoppingCartIcon className="w-4 h-4" />
          <p className="pl-1 text-sm">Sepet</p>
          {hasProducts && (
            <div className="ml-1 bg-orange-500 text-white text-[11px] w-4 h-4 leading-4 text-center rounded-full">
              {cartCount}
            </div>
          )}
        </Link>
      </HoverCardTrigger>

      <HoverCardContent
        sideOffset={2}
        side="bottom"
        align="end"
        className="w-[320px] shadow-lg p-0"
      >
        {hasProducts ? <CartContainer /> : <NoProductCart />}
      </HoverCardContent>
    </HoverCard>
  )
}

function NoProductCart() {
  return (
    <div className="flex items-center justify-center py-2 px-1">
      <p className="font-medium">Sepetinizde ürün bulunmamaktadır.</p>
    </div>
  )
}
