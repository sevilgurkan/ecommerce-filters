'use client'
import { useQuery } from '@tanstack/react-query'
import type { ShoppingCart } from '@repo/common'

import { getCartProducts } from '@/lib/api'
import { ProductImage } from '@/components/Product/ProductImage'
import { CartActions } from './CartActions'

export function CartContainer() {
  const { data: cart, status } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartProducts,
    staleTime: 0,
  })

  return (
    <div className="mt-4">
      {status === 'pending' ? (
        <p>Yükleniyor...</p>
      ) : status === 'error' ? (
        <p>Sepet yüklenirken bir hata oluştu</p>
      ) : status === 'success' ? (
        <CartProducts cart={cart} />
      ) : null}
    </div>
  )
}

function CartProducts({ cart }: { cart: ShoppingCart }) {
  const { count, items } = cart
  return (
    <div>
      <div className="text-xl font-semibold">{`Sepetim (${count} Ürün)`}</div>
      {count > 0 ? (
        <div className="mt-4">
          <div className="border rounded-lg [&>*:not(:last-of-type)]:border-b">
            {items.map(item => (
              <div key={item.id} className="flex items-center px-8 py-8">
                <div className="border rounded-md overflow-hidden relative h-[100px] w-[70px] mr-4">
                  <ProductImage
                    src={item.imageUrl}
                    fill
                    style={{ objectFit: 'cover' }}
                    alt="No product image"
                  />
                </div>
                <div className="block w-[380px] mr-4">
                  <p className="truncate font-semibold">{item.brand.name}</p>
                  <p className="truncate">{item.name}</p>
                </div>

                {/* Actions */}
                <CartActions item={item} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
