import type { Express } from 'express'

import { filterQueryMiddleware } from '../middlewares'
import { readProductsSeedFiles } from '../seed.db'
import { BaseResponse } from '../handlers'

import { sstHandler, paginationHandler, filterHandler } from '../utils/product'

export function productsRoute(app: Express) {
  app.get('/products', filterQueryMiddleware, async (req, res) => {
    try {
      const products = await readProductsSeedFiles()

      const filterQuery = req.__parsedQuery

      const filteredProducts = filterHandler(products, filterQuery)

      if (filteredProducts.length === 0) {
        return BaseResponse.failure(res, {
          message:
            'No products found. Please try again with different filters.',
        })
      }

      const sortedProducts = sstHandler(filteredProducts, filterQuery)
      const paginatedProducts = paginationHandler(sortedProducts, filterQuery)

      return BaseResponse.success(res, {
        payload: {
          data: paginatedProducts.products,
          cursor: paginatedProducts.validCursor,
        },
      })
    } catch (error) {
      console.log(error)

      return BaseResponse.failure(res, {
        message: 'Something went wrong',
      })
    }
  })
}
