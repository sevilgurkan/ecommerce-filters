import React, { useRef } from 'react'
import Link from 'next/link'
import { Product } from '@repo/common'
import { ProductImageContainer } from './ProductImage/ProductImageContainer'
import { ProductBody } from './ProductBody'
import { AddToCartButton } from '../Cart/AddToCartButton'

const noop = () => {}

interface ProductCardContainerProps {
  product: Product
  showAddToCartButton?: boolean
  addToCart?(product: Product): void
  goToProductDetail?(): void
  handleFavorite?(): void
}

export function ProductCardContainer({
  product,
  showAddToCartButton,
  addToCart = noop,
  goToProductDetail,
  handleFavorite,
}: ProductCardContainerProps) {
  return (
    <div key={product.id} className="h-[400px] w-[230px] border rounded-lg">
      <div className="relative flex flex-col h-full">
        <Link href="">
          <ProductImageContainer
            product={product}
            onFavouriteClick={handleFavorite}
          />
          <ProductBody product={product} />
        </Link>

        {showAddToCartButton && (
          <AddToCartButton product={product} addToCart={addToCart} />
        )}
      </div>
    </div>
  )
}
