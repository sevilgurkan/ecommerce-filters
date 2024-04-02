'use client'
import { useState } from 'react'
import { Products } from '@/components/Product/Products'
import { SearchSortFilters } from '../SearchSortFilters'
import { QuickFilters } from '../QuickFilters'
import { Product } from '@repo/common'
import { LoadMore } from '../LoadMore'
import { FetchNextPageOptions } from '@tanstack/react-query'

interface SearchProductsProps {
  products: Product[]
  loadMoreFn: (opts?: FetchNextPageOptions) => Promise<unknown>
  isFetchingNextPage?: boolean
  hasNextPage?: boolean
}

export function SearchProducts({
  products,
  loadMoreFn,
  isFetchingNextPage,
  hasNextPage,
}: SearchProductsProps) {
  return (
    <div className="grow ml-5 space-y-4">
      <div className="flex justify-between">
        <QuickFilters />
        <SearchSortFilters />
      </div>
      <div>
        <Products products={products} />
        <LoadMore
          loadMoreFn={loadMoreFn}
          hasNextPage={hasNextPage}
          isFetching={isFetchingNextPage}
        />
      </div>
    </div>
  )
}
