import 'express'
import { FilterQueryStructure } from './types'
import { Product } from '@repo/common'

declare module 'express-serve-static-core' {
  interface Request {
    __parsedQuery: FilterQueryStructure
  }
}
