'use client'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { getProducts } from '@/lib/api'

import { Filters } from '@/components/Filters/Filters'
import { SearchProducts } from '@/components/Product/SearchProducts'

export function SearchApp() {
  const searchParams = useSearchParams()
  const decodedParams = decodeURIComponent(searchParams.toString())

  const {
    data,
    status,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['products', decodedParams],
    queryFn: async ({ pageParam }) => {
      return getProducts(decodedParams, pageParam)
    },
    select: data => data.pages.flatMap(page => page.data),
    initialPageParam: 0,
    getPreviousPageParam: firstPage => firstPage.cursor ?? undefined,
    getNextPageParam: lastPage => lastPage.cursor ?? undefined,
    placeholderData: keepPreviousData,
    staleTime: 0,
    retry: false,
  })

  const isFilterFetch =
    isFetching && !isFetchingNextPage && !isFetchingPreviousPage

  return (
    <div
      className={cn(
        'flex mt-5 transition-opacity duration-[240ms]',
        isFilterFetch ? 'opacity-30' : 'opacity-100'
      )}
    >
      <Filters />

      {status === 'error' && <SearchNoResult />}
      {status === 'success' && (
        <SearchProducts
          products={data}
          loadMoreFn={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  )
}

function SearchNoResult() {
  return (
    <div className="grow flex flex-col items-center mt-16">
      <Image
        src="/undraw_not_found.svg"
        width={200}
        height={200}
        alt="Product not found image"
      />
      <p className="font-medium text-gray-500 mt-4">
        Aramanız için sonuç bulunamadı!
      </p>
      <p className="mt-1 text-gray-600">
        Soldaki listeden arama terimlerini değiştirerek başka bir arama yapın
      </p>
    </div>
  )
}
