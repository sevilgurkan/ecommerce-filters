'use client'
import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  type PropsWithChildren,
} from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import type { Filter, SSTKeys } from '@repo/common'

export type FilterResponse = {
  aggregations: Filter[]
  quickFilters: Filter[]
  sortTypes: { key: SSTKeys; text: string }[]
}

type HandleFilter = {
  key?: string
  value: string
  full?: boolean
}

type FilterContextValue = {
  filters: FilterResponse
  onFilter({}: HandleFilter): void
}

const FilterContext = createContext<FilterContextValue | null>(null)

interface FilterProviderProps extends PropsWithChildren {
  filters: FilterResponse
}

export function FilterProvider({ children, filters }: FilterProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleFilter = useCallback(
    ({ key, value, full }: HandleFilter) => {
      if (!value) return

      if (full) {
        router.replace(`${pathname}?${value}`)
        return
      }

      if (!key) return

      const params = new URLSearchParams(searchParams)

      params.set(key, value)
      const decodedParams = decodeURIComponent(params.toString())

      router.replace(`${pathname}?${decodedParams}`)
    },
    [pathname, router, searchParams]
  )

  const value: FilterContextValue = useMemo(
    () => ({
      filters,
      onFilter: handleFilter,
    }),
    [filters, handleFilter]
  )

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}

export const useFilter = () => {
  const context = useContext(FilterContext)

  if (!context)
    throw new Error('useFilter must be used within a <FilterProvider />')

  return context
}
