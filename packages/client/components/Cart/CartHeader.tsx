import type { ShoppingCart } from '@repo/common'

export function CartHeader({ cart }: { cart: ShoppingCart }) {
  return (
    <div className="font-semibold pl-4 h-[50px] leading-5 flex items-center">{`Sepetim (${cart.count} Ürün)`}</div>
  )
}
