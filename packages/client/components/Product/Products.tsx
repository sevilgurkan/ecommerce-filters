'use client'
import React from 'react'
import { Product } from '@repo/common'
import { useUpdateCart } from '@/queries/mutations/cart'
import { ProductCardContainer } from './ProductCardContainer'

interface ProductsProps {
  products: Product[]
}

export function Products({ products }: ProductsProps) {
  const updateCart = useUpdateCart()

  const handleAddToCart = async (product: Product) => {
    updateCart.mutate({
      brandId: product.brand.id,
      productId: product.id,
      quantity: 1,
    })
  }

  const handleGoToProductDetail = () => {}

  return (
    <div className="grid grid-cols-4 gap-8">
      {products.map(product => (
        <ProductCardContainer
          key={product.id}
          product={product}
          showAddToCartButton
          addToCart={handleAddToCart}
          goToProductDetail={handleGoToProductDetail}
        />
      ))}
    </div>
  )
}
