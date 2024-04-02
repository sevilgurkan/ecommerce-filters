import { cn } from '@/lib/utils'
import { Product } from '@repo/common'

export function ProductPriceBox({
  className,
  price,
}: {
  className?: string
  price: Product['price']
}) {
  const { discountedPrice, originalPrice } = price
  const isDiscounted = discountedPrice < originalPrice

  return (
    <div className={cn('space-x-1', className)}>
      <span
        className={cn({
          'line-through text-sm text-gray-500': isDiscounted,
          'text-brand font-semibold text-[16px]': !isDiscounted,
        })}
      >
        {originalPrice.toLocaleString('tr-TR')} TL
      </span>
      {isDiscounted && (
        <span className="text-red-700 font-semibold">
          {discountedPrice.toLocaleString('tr-TR')} TL
        </span>
      )}
    </div>
  )
}
