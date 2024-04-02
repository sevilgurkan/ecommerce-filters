import { Product } from '@repo/common'
import { ProductPriceBox } from './ProductPriceBox'
import { ProductRatings } from './ProductRatings'

export function ProductBody({ product }: { product: Product }) {
  const { brand, name, price, ratingScore } = product

  return (
    <div className="p-2">
      <h3 className="text-sm line-clamp-2">
        <span className="font-semibold">{brand.name}</span>
        <span className="pl-1">{name}</span>
      </h3>
      <ProductRatings ratingScore={ratingScore} />
      <ProductPriceBox className="pt-2" price={price} />
    </div>
  )
}
