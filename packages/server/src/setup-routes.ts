import type { Express } from 'express'
import { filtersRoute } from './routes/filters'
import { productsRoute } from './routes/products'
import { cartRoutes } from './routes/cart'

export function setupRoutes(app: Express) {
  filtersRoute(app)
  productsRoute(app)
  cartRoutes(app)
}
