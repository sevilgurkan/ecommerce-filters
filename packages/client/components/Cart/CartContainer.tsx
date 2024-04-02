'use client'
import type { ShoppingCart } from '@repo/common'
import { useQuery } from '@tanstack/react-query'

import { getCartProducts } from '@/lib/api'
import { CartProducts } from './CartProducts'
import { CartActions } from './CartActions'
import { CartHeader } from './CartHeader'

export function CartContainer() {
  const { data: cart, status } = useQuery<ShoppingCart>({
    queryKey: ['cart'],
    queryFn: getCartProducts,
    staleTime: 0,
  })

  return status === 'error' ? (
    <p>Sepetteki ürünler yüklenirken hata oluştu.</p>
  ) : status === 'success' ? (
    <div>
      <CartHeader cart={cart} />
      <div className="bg-gray-200 h-[1px] w-full" />
      <CartProducts cart={cart} />
      <CartActions />
    </div>
  ) : null
}
