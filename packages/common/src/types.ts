export type Dict<T = unknown> = Record<string, T>

// Search Sort Types = SST
export enum SSTTypes {
  PRICE_BY_ASC = 'PRICE_BY_ASC',
  PRICE_BY_DESC = 'PRICE_BY_DESC',
  MOST_RECENT = 'MOST_RECENT',
  BEST_SELLER = 'BEST_SELLER',
  MOST_FAVOURITE = 'MOST_FAVOURITE',
  MOST_RATED = 'MOST_RATED',
}

export type SSTKeys = keyof typeof SSTTypes

export const sstKeys: SSTKeys[] = [
  'PRICE_BY_ASC',
  'PRICE_BY_DESC',
  'MOST_RECENT',
  'BEST_SELLER',
  'MOST_FAVOURITE',
  'MOST_RATED',
]

export enum ProductBadgeTypes {
  FREE_CARGO = 'FREE_CARGO',
  RUSH_DELIVERY = 'RUSH_DELIVERY',
}

export type ProductBadgeKeys = keyof typeof ProductBadgeTypes

export type ProductBadge = {
  title: string
  type: ProductBadgeKeys
}

export type Brand = {
  id: number
  name: string
  text: string
}

export type Category = {
  id: number
  name: string
  type: string
}

export type PriceRange = { id: string; start: number; end: number }

export type BrandProducts = Dict<Product[]>
export type CategoryProducts = Dict<Product[]>

export type Product = {
  id: number
  badges: ProductBadge[]
  brand: {
    id: number
    name: string
  }
  category: {
    id: number
    name: string
  }
  imageUrl: string
  name: string
  isBestSeller: boolean
  sameDayShipping: boolean
  freeCargo: boolean
  rushDeliveryDuration: number
  createdAt: Date
  price: {
    originalPrice: number
    discountedPrice: number
  }
  ratingScore: {
    averageRating: number
  }
}

export type FilterDisplayType = 'list' | 'range' | 'toggle'

export type FilterValue = {
  id: string
  text: string
  filtered: boolean
  type: string
  count: number
  url: string
}

export type Filter = {
  type: string
  displayType: FilterDisplayType
  title: string
  order: number
  totalCount: number
  values: FilterValue[]
}

export type ShoppingCartItem = {
  brand: Product['brand']
  price: Product['price']
  id: Product['id']
  name: Product['name']
  imageUrl: Product['imageUrl']
  quantity: number
}

export type ShoppingCart = {
  count: number
  items: ShoppingCartItem[]
}
