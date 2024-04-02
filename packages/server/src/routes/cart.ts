import type { Express } from 'express'
import { z } from 'zod'

import { readSeedFile } from '../seed.db'
import { BaseResponse } from '../handlers'
import { ShoppingCart, Dict, Product } from '@repo/common'

const basketSchema = z.object({
  brandId: z.coerce.number(),
  productId: z.coerce.number(),
  quantity: z.number(),
})

const shoppingCart: ShoppingCart = {
  count: 0,
  items: [],
}

export function cartRoutes(app: Express) {
  app.get('/cart', async (_req, res) => {
    return BaseResponse.success(res, {
      payload: shoppingCart,
    })
  })

  app.post('/cart', async (req, res) => {
    try {
      const { brandId, productId, quantity } = basketSchema.parse(req.body)

      const item = shoppingCart.items.find(i => i.id === productId)

      if (item) {
        item.quantity += quantity
        return BaseResponse.success(res)
      }

      const brandProducts =
        await readSeedFile<Dict<Product[]>>(`/brand-products.json`)

      const brand = brandProducts[brandId]

      if (!brand) {
        return BaseResponse.failure(res, {
          message: 'Brand not found',
        })
      }

      const product = brand.find(p => p.id === productId)

      if (!product) {
        return BaseResponse.failure(res, {
          message: 'Product not found',
        })
      }

      shoppingCart.items.push({
        brand: product.brand,
        price: product.price,
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        quantity,
      })

      shoppingCart.count += 1

      return BaseResponse.success(res)
    } catch (error) {
      return BaseResponse.failure(res, {
        message: 'Something went wrong',
      })
    }
  })

  app.put('/cart', async (req, res) => {
    const { productId, quantity } = req.body

    try {
      const item = shoppingCart.items.find(i => i.id === productId)

      if (!item) {
        return BaseResponse.failure(res, {
          message: 'Product not found',
        })
      }

      item.quantity = quantity

      return BaseResponse.success(res)
    } catch (error) {
      return BaseResponse.failure(res, {
        message: 'Something went wrong',
      })
    }
  })

  app.delete('/cart', async (req, res) => {
    const { productId } = req.body

    try {
      const index = shoppingCart.items.findIndex(i => i.id === productId)

      if (index === -1) {
        return BaseResponse.failure(res, {
          message: 'Product not found',
        })
      }

      shoppingCart.items.splice(index, 1)
      shoppingCart.count -= 1

      return BaseResponse.success(res)
    } catch (error) {
      return BaseResponse.failure(res, {
        message: 'Something went wrong',
      })
    }
  })

  app.get('/cart/count', async (req, res) => {
    return BaseResponse.success(res, {
      payload: shoppingCart.count,
    })
  })
}
