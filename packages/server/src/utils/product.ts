import { Product } from '@repo/common'
import { FilterQueryStructure } from '../types'

type FilterFn = (p: Product) => boolean

function getFilterFnMap(
  query: Required<FilterQueryStructure>
): Record<string, FilterFn> {
  const limits = findMinMaxPriceLimits(query.price)

  const isBrand = (p: Product) => query.brand.includes(p.brand.id)
  const isGender = (p: Product) => query.gender.includes(p.category.id)
  const isPrice = (p: Product) => isBetweenLimits(limits, p.price.originalPrice)
  const isFreeCargo = (p: Product) => p.freeCargo === true
  const isSameDayShipping = (p: Product) => p.sameDayShipping === true
  const isRushDelivery = (p: Product) => p.rushDeliveryDuration > 0
  const isProductRate = (p: Product) => p.ratingScore.averageRating > 4.5

  return {
    brand: isBrand,
    gender: isGender,
    price: isPrice,
    fc: isFreeCargo,
    pr: isProductRate,
    rd: isRushDelivery,
    sds: isSameDayShipping,
  }
}

export function getFilterFns(query: FilterQueryStructure) {
  const filterMap = getFilterFnMap(query as Required<FilterQueryStructure>)

  return Object.keys(query).reduce((res, key) => {
    return key in filterMap ? [...res, filterMap[key]] : res
  }, [] as FilterFn[])
}

export function filterHandler(
  products: Product[],
  query: FilterQueryStructure
) {
  const filterFns = getFilterFns(query)

  if (filterFns.length === 0) return products

  return products.filter(p => filterFns.every(fn => fn(p)))
}

export function sstHandler(products: Product[], query: FilterQueryStructure) {
  const { sst } = query

  let handler: (products: Product[]) => Product[]

  switch (sst) {
    case 'PRICE_BY_ASC':
    case 'PRICE_BY_DESC':
      handler = getPriceByAscOrDesc()
      break
    case 'MOST_RECENT':
      handler = mostRecent
      break
    case 'BEST_SELLER':
      handler = bestSeller
      break
    case 'MOST_FAVOURITE':
      handler = mostFavourite
      break
    case 'MOST_RATED':
      handler = mostRated
      break
    case 'RECOMMENDED':
    default:
      handler = defaultSST
  }

  return handler(products)

  function defaultSST(products: Product[]) {
    // In a real application,
    // the "recommended products" algorithm might be here.

    return products
  }

  function getPriceByAscOrDesc() {
    const getPriceToCheck = (price: Product['price']) => {
      return price.discountedPrice !== price.originalPrice
        ? price.discountedPrice
        : price.originalPrice
    }

    const getPrices = (pA: Product, pB: Product) => {
      return [getPriceToCheck(pA.price), getPriceToCheck(pB.price)]
    }

    return sst === 'PRICE_BY_ASC' ? priceByAsc : priceByDesc

    function priceByAsc(products: Product[]) {
      return products.slice().sort((pA, pB) => {
        const [priceA, priceB] = getPrices(pA, pB)
        return priceA - priceB
      })
    }

    function priceByDesc(products: Product[]) {
      return products.slice().sort((pA, pB) => {
        const [priceA, priceB] = getPrices(pA, pB)
        return priceB - priceA
      })
    }
  }

  function mostRecent(products: Product[]) {
    return products.slice().sort((pA, pB) => {
      const aDate = new Date(pA.createdAt)
      const bDate = new Date(pB.createdAt)

      return aDate > bDate ? -1 : aDate > bDate ? 1 : 0
    })
  }

  function bestSeller(products: Product[]) {
    return products.filter(p => p.isBestSeller)
  }

  function mostRated(products: Product[]) {
    return products
      .slice()
      .sort(
        (pA, pB) => pB.ratingScore.averageRating - pA.ratingScore.averageRating
      )
  }

  function mostFavourite(products: Product[]) {
    // not implemented
    return products
  }
}

export function paginationHandler(
  products: Product[],
  query: FilterQueryStructure
) {
  const { cursor, limit } = query

  const cursorInt = cursor ? cursor : 0
  const limitInt = limit ? limit : 10

  const nextCursor = cursorInt + limitInt
  const validCursor = nextCursor > products.length ? null : nextCursor

  const result = products.slice(cursorInt, cursorInt + limitInt)

  return {
    products: result,
    validCursor,
  }
}

export function isBetweenLimits(
  limits: ReturnType<typeof findMinMaxPriceLimits>,
  price: number
) {
  if (!limits) return false

  return price >= limits.start && price <= limits.end
}

export function findMinMaxPriceLimits(
  priceParam: FilterQueryStructure['price']
) {
  if (!priceParam) return null

  let start
  let end

  // params are validated by the our schema(filter-query-schema.ts),
  // so we can safely assume that the string is in the correct format
  const [minStr, maxStr] = priceParam.split('-')

  start = parseInt(minStr, 10)
  end = maxStr === '*' ? Infinity : parseInt(maxStr, 10)

  return { start, end }
}
