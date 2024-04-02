'use client'
import { Trash2Icon } from 'lucide-react'
import type { ShoppingCartItem } from '@repo/common'

import { useDeleteCart } from '@/queries/mutations/cart'
import { Counter } from './Counter'

export function CartActions({ item }: { item: ShoppingCartItem }) {
  const deleteCart = useDeleteCart()

  const handleDeleteFromCart = async () => {
    deleteCart.mutate({ productId: item.id })
  }

  return (
    <div className="flex items-center">
      <Counter item={item} />
      <PriceLabel item={item} />
      <button
        aria-label="Ürünü sepetten çıkartma"
        onClick={handleDeleteFromCart}
      >
        <Trash2Icon className="w-5 h-5 text-gray-400 hover:text-brand" />
      </button>
    </div>
  )
}

function PriceLabel({ item }: { item: ShoppingCartItem }) {
  const { discountedPrice, originalPrice } = item.price

  const isDiscounted = discountedPrice < originalPrice

  const [dcPrice, ogPrice] = applyQuantityPrice(
    [discountedPrice, originalPrice],
    item.quantity
  )

  const discountedPriceText = dcPrice.toLocaleString('tr-TR')
  const originalPriceText = ogPrice.toLocaleString('tr-TR')

  return (
    <div className="w-[120px] flex flex-col items-center justify-center text-brand">
      {isDiscounted && (
        <span className="line-through text-gray-500 text-sm">
          {`${originalPriceText} TL`}
        </span>
      )}
      {`${isDiscounted ? discountedPriceText : originalPriceText} TL`}
    </div>
  )
}

function applyQuantityPrice(prices: number[], quantity: number) {
  if (quantity < 1) return prices
  return prices.map(price => price * quantity)
}
