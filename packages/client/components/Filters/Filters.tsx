'use client'
import { memo } from 'react'
import { cn } from '@/lib/utils'

import { FilterWrapper } from './FilterWrapper'
import { useFilter } from '../FilterProvider'

export const Filters = memo(function Filters() {
  const { filters } = useFilter()

  return (
    <div className="sticky top-0 w-[200px] h-screen shrink-0">
      <div
        className={cn(
          'relative overflow-x-hidden overflow-y-scroll border rounded-xl',
          '[&>*:not(:first-of-type)]:shadow-[inset_0_1px_0_0] [&>*:not(:first-of-type)]:shadow-gray-200'
        )}
      >
        {filters.aggregations.map(filter => {
          return <FilterWrapper key={filter.title} filter={filter} />
        })}
      </div>
    </div>
  )
})
