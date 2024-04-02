import { Product } from '@repo/common'
import Image from 'next/image'
import { ProductImageBadges } from './ProductImageBadges'
import { ProductFavouriteButton } from '../ProductFavouriteButton'
import { ProductImage } from './ProductImage'

interface ProductImageContainerProps {
  product: Product
  onFavouriteClick?(): void
}

export function ProductImageContainer({
  product,
  onFavouriteClick,
}: ProductImageContainerProps) {
  return (
    <div className="relative h-[250px] flex items-center justify-center">
      <ProductImageBadges badges={product.badges} />

      <ProductImage
        src={product.imageUrl}
        width={150}
        height={150}
        alt="No product image"
      />

      <ProductFavouriteButton onClick={onFavouriteClick} />

      {product.isBestSeller && (
        <div className="absolute left-2 bottom-2">
          <Image
            src="/icons8-best-seller-48.png"
            width={40}
            height={40}
            alt="Best seller image"
          />
        </div>
      )}
    </div>
  )
}
