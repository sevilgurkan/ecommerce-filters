import type { Product, ShoppingCart } from '@repo/common'
import type { FilterResponse } from '@/components/FilterProvider'
import { fetcher } from './fetcher'

const PRODUCTS_PATH = '/products'
const CART_PATH = '/cart'
const CART_COUNT_PATH = '/cart/count'
const FILTERS_PATH = '/filters'

export async function getProducts(query: string, cursor: number) {
  query = query ? `${query}&cursor=${cursor}` : `cursor=${cursor}`

  const url = `${PRODUCTS_PATH}?${query}`
  const result = await fetcher(url)

  // added some delay for infinite scrolling demo
  return new Promise<{ data: Product[]; cursor: number | null }>(resolve => {
    setTimeout(resolve, 300, result.payload)
  })
}

export async function getFilters(searchParams: Record<string, string>) {
  const params = new URLSearchParams(searchParams)
  const decodedParams = decodeURIComponent(params.toString())

  const url = `${FILTERS_PATH}?${decodedParams}`
  const res = await fetcher<FilterResponse>(url)

  return res
}

export async function getCartProducts() {
  const res = await fetcher<ShoppingCart>(CART_PATH)
  return res.payload
}

export async function getCartCount() {
  const res = await fetcher<number>(CART_COUNT_PATH)
  return res.payload
}

export async function addToCart(body: {
  brandId: number
  productId: number
  quantity: number
}) {
  const res = await fetcher(CART_PATH, body)
  return res.payload
}

export async function deleteFromCart(body: { productId: number }) {
  const res = await fetcher(CART_PATH, body, { method: 'DELETE' })
  return res.payload
}

export async function updateCartQuantity(body: {
  productId: number
  quantity: number
}) {
  const res = await fetcher(CART_PATH, body, { method: 'PUT' })
  return res.payload
}
