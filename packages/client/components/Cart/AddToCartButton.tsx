import { useRef, useState } from 'react'
import { Product } from '@repo/common'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const ADD_TO_CART = 'Sepete Ekle'
const ADDED_TO_CART = 'Sepete Eklendi'

interface AddToCartButtonProps {
  product: Product
  addToCart(product: Product): void
}

export function AddToCartButton({ product, addToCart }: AddToCartButtonProps) {
  const timerRef = useRef<NodeJS.Timeout>()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddProduct = (product: Product) => {
    setIsAdding(true)
    addToCart(product)

    timerRef.current = setTimeout(() => {
      clearTimeout(timerRef.current)
      setIsAdding(false)
    }, 2000)
  }

  return (
    <div className="px-2 pb-2 mt-auto flex items-center justify-center">
      <Button
        variant="unstyled"
        className={cn(
          'block w-full font-semibold text-sm border overflow-hidden h-[32px] transition-colors duration-700',
          {
            'bg-green-500 text-white border-white': isAdding,
            'bg-white text-orange-500 border-orange-500': !isAdding,
          }
        )}
        size="sm"
        onClick={() => handleAddProduct(product)}
      >
        <div
          className={cn('transition-transform duration-700', {
            'translate-y-[-36px]': isAdding,
            'translate-y-[5px]': !isAdding,
          })}
        >
          {ADD_TO_CART}
        </div>
        <div
          className={cn('transition-transform duration-700', {
            '-translate-y-[14px]': isAdding,
            'translate-y-[14px]': !isAdding,
          })}
        >
          {ADDED_TO_CART}
        </div>
      </Button>
    </div>
  )
}
