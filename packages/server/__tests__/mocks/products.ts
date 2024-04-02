import { Product } from '@repo/common'

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

const createdAt = new Date()

export const mockProducts: DeepPartial<Product>[] = [
  {
    id: 1000,
    brand: { id: 100 },
    category: { id: 1 },
    isBestSeller: false,
    sameDayShipping: true,
    freeCargo: true,
    rushDeliveryDuration: 17,
    createdAt: new Date(createdAt.setMonth(6)),
    price: { originalPrice: 744, discountedPrice: 744 },
    ratingScore: { averageRating: 2.834013620391488 },
  },
  {
    id: 2000,
    brand: { id: 200 },
    category: { id: 2 },
    isBestSeller: true,
    sameDayShipping: false,
    freeCargo: false,
    rushDeliveryDuration: 14,
    createdAt: new Date(createdAt.setMonth(2)),
    price: { originalPrice: 28305, discountedPrice: 17810 },
    ratingScore: { averageRating: 4.691842622030527 },
  },
  {
    id: 3000,
    brand: { id: 300 },
    category: { id: 3 },
    isBestSeller: true,
    sameDayShipping: true,
    freeCargo: false,
    rushDeliveryDuration: 28,
    createdAt: new Date(createdAt.setMonth(11)),
    price: { originalPrice: 39895, discountedPrice: 22931 },
    ratingScore: { averageRating: 4.891842622030527 },
  },
]
