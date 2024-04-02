'use client'
import React from 'react'
import { StarIcon, BoxIcon, TruckIcon, LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { useFilter } from './FilterProvider'

const quickFilterVariants = cva(
  'flex items-center px-2 py-1 border rounded-lg',
  {
    variants: {
      variant: {
        fc: 'bg-gray-200/80 hover:border-gray-600 [&>svg]:stroke-gray-200 [&>svg]:fill-gray-500',
        rd: 'bg-green-200/80 hover:border-green-600 [&>svg]:stroke-green-500',
        sds: 'bg-green-200/80 hover:border-green-600 [&>svg]:stroke-green-700',
        pr: 'bg-yellow-200/80 hover:border-yellow-600 [&>svg]:fill-yellow-500 [&>svg]:text-yellow-500',
      },
      active: {
        true: true,
        false: false,
      },
    },
    compoundVariants: [
      {
        variant: ['fc', 'rd', 'sds', 'pr'],
        active: false,
        className: 'border-transparent',
      },
      {
        variant: ['rd', 'sds'],
        active: true,
        className: 'border-green-600',
      },
      { variant: 'fc', active: true, className: 'border-gray-600' },
      { variant: 'pr', active: true, className: 'border-yellow-600' },
    ],
  }
)

type Variant = VariantProps<typeof quickFilterVariants>

const quickFiltersIconMap: Record<string, LucideIcon> = {
  fc: BoxIcon,
  rd: TruckIcon,
  sds: TruckIcon,
  pr: StarIcon,
}

export function QuickFilters() {
  const { filters, onFilter } = useFilter()

  const handleFilterChange = (url: string) => {
    onFilter({ value: url, full: true })
  }

  const quickFilters = filters.quickFilters.map(
    filterItem => filterItem.values[0]
  )

  return (
    <div className="flex items-center space-x-4">
      {quickFilters.map(filter => {
        const FilterIcon = quickFiltersIconMap[filter.type]
        return (
          <button
            role="switch"
            aria-label={filter.text}
            aria-checked={filter.filtered}
            key={filter.type}
            className={cn(
              quickFilterVariants({
                variant: filter.type as Variant['variant'],
                active: filter.filtered,
              })
            )}
            onClick={() => handleFilterChange(filter.url)}
          >
            <FilterIcon className="w-4 h-4" />
            <span className="ml-1 text-sm">{filter.text}</span>
          </button>
        )
      })}
    </div>
  )
}
