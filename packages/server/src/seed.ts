import path from 'path'
import fs from 'fs'
import { faker } from '@faker-js/faker'

import {
  SSTTypes,
  Brand,
  Category,
  Product,
  ProductBadgeTypes,
} from '@repo/common'

const seedsPath = path.resolve(__dirname, './seeds')

const mandatoryFiles = [
  'brands.json',
  'products.json',
  'categories.json',
  'price-ranges.json',
  'quick-filters.json',
  'brand-products.json',
  'search-sortings.json',
  'category-products.json',
]

const uniqueId = idGenerator()

export function seed({ recreateOnEveryRefresh = false } = {}) {
  if (!recreateOnEveryRefresh && fs.existsSync(seedsPath)) {
    const files = fs.readdirSync(seedsPath)

    if (mandatoryFiles.every(file => files.includes(file))) {
      console.log('Contains all files')
      return
    }
  }

  fs.rmSync(seedsPath, { force: true, recursive: true })
  console.log('Initiating seed data generation...')
  try {
    generateSeeds()
    console.log('✅ Seed data generation was successful.')
  } catch (error) {
    console.log('An error occurred during the seed data generation process.')
    console.log(error)
  }
}

function generateSeeds() {
  const brands = createBrands()
  const categories = createCategories()
  const { products, brandProducts, categoryProducts } = createProducts(
    brands,
    categories
  )
  const priceRanges = createPriceRanges(products)
  const searchSortings = createSearchSortings()
  const quickFilters = createQuickFilters()

  if (!fs.existsSync(seedsPath)) {
    fs.mkdirSync(seedsPath)
  }

  writeSeedFile('/brands.json', brands)
  writeSeedFile('/products.json', products)
  writeSeedFile('/categories.json', categories)
  writeSeedFile('/price-ranges.json', priceRanges)
  writeSeedFile('/quick-filters.json', quickFilters)
  writeSeedFile('/brand-products.json', brandProducts)
  writeSeedFile('/search-sortings.json', searchSortings)
  writeSeedFile('/category-products.json', categoryProducts)
}

function writeSeedFile(path: string, data: any) {
  fs.writeFileSync(
    `${seedsPath}${path}`,
    JSON.stringify(data, null, 2),
    'utf-8'
  )
}

function createProducts(brands: Brand[], categories: Category[]) {
  const productLengths = [34, 67, 90]
  // const productLengths = [4250, 9823, 7122]

  const products = []
  const brandProducts: Record<number, Product[]> = {}
  const categoryProducts: Record<number, Product[]> = {}

  for (const brand of brands) {
    let len = productLengths[Math.floor(Math.random() * productLengths.length)]

    brandProducts[brand.id] = []

    while (len > 0) {
      const productId = uniqueId()

      const randomCategoryIndex = getRandomIntMaxExclusive(0, categories.length)
      const category = categories[randomCategoryIndex]

      categoryProducts[category.id] = categoryProducts[category.id] ?? []

      const product = createProduct(productId, brand, category)
      products.push(product)
      brandProducts[brand.id].push(product)
      categoryProducts[category.id].push(product)

      len--
    }
  }

  return { products, brandProducts, categoryProducts }
}

function createProduct(id: number, brand: Brand, category: Category) {
  const createdAt = faker.date.between({
    from: new Date().setFullYear(2020),
    to: new Date().setFullYear(2024),
  })

  const badges = []
  const MIN_PRICE = 50
  const MAX_PRICE = 50_000

  const name = faker.commerce.productDescription()

  const isDiscounted = faker.datatype.boolean({ probability: 0.4 })
  const isBestSeller = faker.datatype.boolean({ probability: 0.3 })
  const sameDayShipping = faker.datatype.boolean({ probability: 0.3 })
  const freeCargo = faker.datatype.boolean({ probability: 0.5 })
  const hasRushDelivery = faker.datatype.boolean({ probability: 0.5 })

  let rushDeliveryDuration = 0

  if (freeCargo) {
    badges.push(productBadge.freeCargo)
  }
  if (hasRushDelivery) {
    badges.push(productBadge.rushDelivery)
    rushDeliveryDuration = faker.number.int({ min: 1, max: 30 })
  }

  const averageRating = faker.number.float({
    min: 1,
    max: 5,
    fractionDigits: 15,
  })

  const originalPrice = parseFloat(
    faker.commerce.price({ min: MIN_PRICE, max: MAX_PRICE, dec: 2 })
  )

  let discountedPrice = originalPrice

  if (isDiscounted) {
    const discountPercentage = faker.helpers.arrayElement([30, 50, 80])
    discountedPrice = applyDiscount(discountPercentage, originalPrice)
  }

  const product: Product = {
    id,
    brand: {
      id: brand.id,
      name: brand.text,
    },
    category: {
      id: category.id,
      name: category.name,
    },
    name,
    badges,
    isBestSeller,
    sameDayShipping,
    freeCargo,
    rushDeliveryDuration,
    createdAt,
    imageUrl: '/undraw_no_image.png',
    price: {
      originalPrice,
      discountedPrice,
    },
    ratingScore: {
      averageRating,
    },
  }

  return product
}

function createPriceRanges(products: Product[]) {
  const sortedPrices = products
    .map(product => product.price.originalPrice)
    .sort((a, b) => a - b)

  const roundUp = (num: number) => {
    const base = 1000
    return Math.ceil(num / base) * base
  }

  const lowerBound = 0
  const upperBound = roundUp(sortedPrices[sortedPrices.length - 1])
  const interval = 5000

  const toRangeField = (start: number, end: number) => {
    return { id: `${start}-${end}`, start, end }
  }

  const ranges = []

  for (let start = lowerBound; start < upperBound; start += interval) {
    const end = Math.min(start + interval, upperBound)
    const rangeField = toRangeField(start, end)
    ranges.push(rangeField)
  }

  return ranges
}

function createBrands(length = 5): Brand[] {
  return Array.from({ length }, () => {
    const brand = faker.company.name()

    return {
      id: uniqueId(),
      name: brand.replace(/,?[ ]/g, '-').replace(/-+/g, '-').toLowerCase(),
      text: brand,
    }
  })
}

function createCategories(): Category[] {
  const categories = [
    { id: 1, type: 'gender', name: 'Kadın' },
    { id: 2, type: 'gender', name: 'Erkek' },
    { type: 'cosmetic', name: 'Kozmetik' },
    { type: 'electronic', name: 'Elektronik' },
    { type: 'spor', name: 'Spor' },
  ]

  return categories.map(category => ({
    id: category?.id ?? uniqueId(),
    name: category.name,
    type: category.type,
  }))
}

function createSearchSortings() {
  return [
    { key: SSTTypes.RECOMMENDED, text: 'Önerilen sıralama' },
    { key: SSTTypes.PRICE_BY_ASC, text: 'En düşük fiyat' },
    { key: SSTTypes.PRICE_BY_DESC, text: 'En yüksek fiyat' },
    { key: SSTTypes.MOST_RECENT, text: 'En yeniler' },
    { key: SSTTypes.BEST_SELLER, text: 'En çok satanlar' },
    { key: SSTTypes.MOST_FAVOURITE, text: 'En çok beğenilenler' },
    { key: SSTTypes.MOST_RATED, text: 'En çok değerlendirilenler' },
  ]
}

function createQuickFilters() {
  return [
    {
      key: 'fc',
      id: 'true',
      filterField: 'freeCargo',
      text: 'Kargo Bedava',
    },
    {
      key: 'rd',
      id: 'true',
      filterField: 'rushDelivery',
      text: 'Hızlı Teslimat',
    },
    {
      key: 'sds',
      id: 'true',
      filterField: 'sameDayShipping',
      text: 'Bugün Kargoda',
    },
    {
      key: 'pr',
      id: 'true',
      filterField: 'productRate',
      text: 'Yüksek Puanlı Ürünler',
    },
  ]
}

function idGenerator() {
  const idSet = new Set<number>()

  const getId = () => {
    return Math.floor(Math.random() * 1_000_000) + 1
  }

  return () => {
    let id = getId()
    while (idSet.has(id)) {
      id = getId()
    }

    idSet.add(id)
    return id
  }
}

function applyDiscount(discountPercentage: number, originalPrice: number) {
  const discountAmount = (originalPrice * discountPercentage) / 100
  const discountedPrice = originalPrice - discountAmount

  return parseFloat(discountedPrice.toFixed(2))
}

function getRandomIntMaxExclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

const productBadge = {
  freeCargo: {
    title: 'Kargo Bedava',
    type: ProductBadgeTypes.FREE_CARGO,
  },
  rushDelivery: {
    title: 'Hızlı Teslimat',
    type: ProductBadgeTypes.RUSH_DELIVERY,
  },
}
