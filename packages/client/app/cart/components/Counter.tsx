'use client'
import type { ShoppingCartItem } from '@repo/common'
import { useUpdateQuantity } from '@/queries/mutations/cart'
import { CounterButton } from './CounterButton'

export function Counter({ item }: { item: ShoppingCartItem }) {
  const updateQuantity = useUpdateQuantity()

  const handleIncreaseQuantity = () => {
    updateQuantity.mutate({ productId: item.id, quantity: item.quantity + 1 })
  }

  const handleDecreaseQuantity = () => {
    updateQuantity.mutate({ productId: item.id, quantity: item.quantity - 1 })
  }

  return (
    <div className="flex w-[90px]">
      <CounterButton
        symbol="-"
        className="rounded-l-sm"
        disabled={item.quantity === 1}
        onClick={handleDecreaseQuantity}
      />
      <input
        className="border-t border-t-gray-300 border-b border-b-gray-300 w-10 px-2 h-8 flex items-center justify-center text-center text-sm select-none pointer-events-none"
        pattern="[0-9]*"
        type="text"
        readOnly
        value={item.quantity}
      />
      <CounterButton
        symbol="+"
        className="rounded-r-sm"
        onClick={handleIncreaseQuantity}
      />
    </div>
  )
}
