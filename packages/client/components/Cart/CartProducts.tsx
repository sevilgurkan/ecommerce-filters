'use client'
import type { ShoppingCart } from '@repo/common'
import Image from 'next/image'

import { ProductPriceBox } from '../Product/ProductBody'
import { CartOverlay } from './CartOverlay'
import { ProductImage } from '../Product/ProductImage'

export function CartProducts({ cart }: { cart: ShoppingCart }) {
  return (
    <div className="relative">
      <ul className="space-y-2 mt-3 px-4 max-h-[300px] overflow-x-hidden overflow-y-auto">
        {cart.items.map(item => {
          return (
            <li key={item.id}>
              <div className="flex">
                <div className="relative overflow-hidden shrink-0 border border-gray-300 shadow-sm rounded-md w-[50px] h-[80px] mr-3">
                  <ProductImage
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ objectFit: 'cover' }}
                    fill
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm line-clamp-2">
                    <span className="font-medium">{item.brand.name}</span>{' '}
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-600 my-[2px]">
                    Adet: {item.quantity}
                  </div>
                  <ProductPriceBox price={item.price} />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      {cart.count > 3 && <CartOverlay />}
    </div>
  )
}
