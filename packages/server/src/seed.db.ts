import fs from 'fs/promises'
import path from 'path'

import { Brand, Category, Dict, Product, PriceRange } from '@repo/common'
import { QuickFilter, SortType } from './types'

const seedsDirPath = path.resolve(__dirname, './seeds')

export const seedPaths = {
  brands: '/brands.json',
  products: '/products.json',
  categories: '/categories.json',
  priceRanges: '/price-ranges.json',
  sortTypes: '/search-sortings.json',
  brandProds: '/brand-products.json',
  quickFilters: '/quick-filters.json',
  categoryProds: '/category-products.json',
}

export async function readSeedFile<T>(path: string) {
  return await fs
    .readFile(`${seedsDirPath}${path}`, 'utf-8')
    .then<T>(data => JSON.parse(data))
}

export async function readFiltersSeedFiles() {
  return Promise.all([
    readSeedFile<Brand[]>(seedPaths.brands),
    readSeedFile<SortType[]>(seedPaths.sortTypes),
    readSeedFile<Category[]>(seedPaths.categories),
    readSeedFile<PriceRange[]>(seedPaths.priceRanges),
    readSeedFile<QuickFilter[]>(seedPaths.quickFilters),
    readSeedFile<Dict<Product[]>>(seedPaths.brandProds),
    readSeedFile<Dict<Product[]>>(seedPaths.categoryProds),
  ])
}

export async function readProductsSeedFiles() {
  return await readSeedFile<Product[]>(seedPaths.products)
}
