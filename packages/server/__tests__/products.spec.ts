import { describe, test, expect } from 'vitest'
import { Product } from '@repo/common'
import {
  filterHandler,
  sstHandler,
  paginationHandler,
} from '../src/utils/product'
import { mockProducts } from './mocks/products'
import { FilterQueryStructure } from '../src/types'

const products = mockProducts as Product[]

describe('Product Utils', () => {
  describe('filterHandler', () => {
    test('should return an empty array when no products match the filter query', () => {
      const filterQuery: FilterQueryStructure = {
        brand: [800, 900],
        gender: [1],
        price: '5000-*',
        fc: true,
      }

      const filteredProducts = filterHandler(products, filterQuery)

      expect(filteredProducts).toBeInstanceOf(Array)
      expect(filteredProducts.length).toBe(0)
    })

    test('should return products with brand id 100 and category id 1', () => {
      const filterQuery: FilterQueryStructure = {
        brand: [100],
        gender: [1],
        price: '500-*',
      }

      const filteredProducts = filterHandler(products, filterQuery)

      expect(filteredProducts).toBeInstanceOf(Array)
      expect(filteredProducts.length).toBe(1)

      expect(filteredProducts).toEqual([
        expect.objectContaining({ brand: { id: 100 }, category: { id: 1 } }),
      ])
    })

    test('should return products with brand id 200 and 300 within the price range of 25000 to 40000', () => {
      const filterQuery: FilterQueryStructure = {
        brand: [200, 300],
        price: '25000-40000',
      }

      const filteredProducts = filterHandler(products, filterQuery)

      expect(filteredProducts).toBeInstanceOf(Array)
      expect(filteredProducts.length).toBe(2)

      expect(filteredProducts).toEqual([
        expect.objectContaining({ brand: { id: 200 } }),
        expect.objectContaining({ brand: { id: 300 } }),
      ])

      filteredProducts.forEach(product => {
        expect(product.price.originalPrice).toBeGreaterThanOrEqual(25000)
        expect(product.price.originalPrice).toBeLessThanOrEqual(40000)
      })
    })

    test('should return products with free cargo', () => {
      const filterQuery: FilterQueryStructure = {
        fc: true,
      }

      const filteredProducts = filterHandler(products, filterQuery)

      expect(filteredProducts).toBeInstanceOf(Array)
      expect(filteredProducts.length).toBe(1)

      expect(filteredProducts).toEqual([
        expect.objectContaining({ freeCargo: true }),
      ])
    })

    test('should return products with same day shipping', () => {
      const filterQuery: FilterQueryStructure = {
        sds: true,
      }

      const filteredProducts = filterHandler(products, filterQuery)

      expect(filteredProducts).toBeInstanceOf(Array)
      expect(filteredProducts.length).toBe(2)

      filteredProducts.forEach(product => {
        expect(product.sameDayShipping).toBe(true)
      })
    })

    test('should return products with rush delivery duration greater than 0', () => {
      const filterQuery: FilterQueryStructure = {
        rd: true,
      }

      const filteredProducts = filterHandler(products, filterQuery)

      expect(filteredProducts).toBeInstanceOf(Array)
      expect(filteredProducts.length).toBe(3)

      filteredProducts.forEach(product => {
        expect(product.rushDeliveryDuration).toBeGreaterThan(0)
      })
    })

    test('should return products with rating score greater than 4.5', () => {
      const filterQuery: FilterQueryStructure = {
        pr: true,
      }

      const filteredProducts = filterHandler(products, filterQuery)

      expect(filteredProducts).toBeInstanceOf(Array)
      expect(filteredProducts.length).toBe(2)

      filteredProducts.forEach(product => {
        expect(product.ratingScore.averageRating).toBeGreaterThan(4.5)
      })
    })
  })

  describe('sstHandler', () => {
    test('should return products sorted by best seller', () => {
      const filterQuery: FilterQueryStructure = {
        sst: 'BEST_SELLER',
      }

      const sortedProducts = sstHandler(products, filterQuery)

      expect(sortedProducts).toBeInstanceOf(Array)
      expect(sortedProducts.length).toBe(2)

      sortedProducts.forEach(product => {
        expect(product.isBestSeller).toBe(true)
      })
    })

    test('should return products sorted by most recent', () => {
      const filterQuery: FilterQueryStructure = {
        sst: 'MOST_RECENT',
      }

      const sortedProducts = sstHandler(products, filterQuery)

      const isSortedByDate = (products: Product[]) => {
        for (let i = 0; i < products.length - 1; i++) {
          if (products[i].createdAt < products[i + 1].createdAt) {
            return false
          }
        }

        return true
      }

      expect(sortedProducts).toBeInstanceOf(Array)
      expect(sortedProducts.length).toBe(3)
      expect(isSortedByDate(sortedProducts)).toBe(true)
    })

    test('should return products sorted by most rated', () => {
      const filterQuery: FilterQueryStructure = {
        sst: 'MOST_RATED',
      }

      const sortedProducts = sstHandler(products, filterQuery)

      const isSortedByRating = (products: Product[]) => {
        for (let i = 0; i < products.length - 1; i++) {
          if (
            products[i].ratingScore.averageRating <
            products[i + 1].ratingScore.averageRating
          ) {
            return false
          }
        }

        return true
      }

      expect(sortedProducts).toBeInstanceOf(Array)
      expect(sortedProducts.length).toBe(3)
      expect(isSortedByRating(sortedProducts)).toBe(true)
    })

    test('should return products sorted by price in ascending order', () => {
      const filterQuery: FilterQueryStructure = {
        sst: 'PRICE_BY_ASC',
      }

      const sortedProducts = sstHandler(products, filterQuery)

      const isSortedByAsc = (products: Product[]) => {
        for (let i = 0; i < products.length - 1; i++) {
          if (
            products[i].price.originalPrice >
            products[i + 1].price.originalPrice
          ) {
            return false
          }
        }

        return true
      }

      expect(sortedProducts).toBeInstanceOf(Array)
      expect(sortedProducts.length).toBe(3)
      expect(isSortedByAsc(sortedProducts)).toBe(true)
    })

    test('should return products sorted by price in descending order', () => {
      const filterQuery: FilterQueryStructure = {
        sst: 'PRICE_BY_DESC',
      }

      const sortedProducts = sstHandler(products, filterQuery)

      const isSortedByDesc = (products: Product[]) => {
        for (let i = 0; i < products.length - 1; i++) {
          if (
            products[i].price.originalPrice <
            products[i + 1].price.originalPrice
          ) {
            return false
          }
        }

        return true
      }

      expect(sortedProducts).toBeInstanceOf(Array)
      expect(sortedProducts.length).toBe(3)
      expect(isSortedByDesc(sortedProducts)).toBe(true)
    })
  })

  describe('paginationHandler', () => {
    test('should return products with cursor 0 and limit 2', () => {
      const filterQuery: FilterQueryStructure = {
        cursor: 0,
        limit: 2,
      }

      const paginatedProducts = paginationHandler(products, filterQuery)

      expect(paginatedProducts.products.length).toBe(2)

      expect(paginatedProducts).toStrictEqual({
        products: products.slice(0, 2),
        validCursor: 2,
      })
    })

    test('should return products with cursor 1 and limit 1', () => {
      const filterQuery: FilterQueryStructure = {
        cursor: 1,
        limit: 1,
      }

      const paginatedProducts = paginationHandler(products, filterQuery)

      expect(paginatedProducts.products.length).toBe(1)

      expect(paginatedProducts).toStrictEqual({
        products: products.slice(1, 2),
        validCursor: 2,
      })
    })

    test('should return products with cursor undefined and limit undefined', () => {
      const filterQuery: FilterQueryStructure = {
        cursor: undefined,
        limit: undefined,
      }

      const paginatedProducts = paginationHandler(products, filterQuery)

      expect(paginatedProducts.products.length).toBe(products.length)

      expect(paginatedProducts).toStrictEqual({
        products,
        validCursor: null,
      })
    })
  })
})
