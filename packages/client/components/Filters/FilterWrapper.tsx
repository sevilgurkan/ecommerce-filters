import type { Filter } from '@repo/common'
import React from 'react'
import { FilterValues } from './FilterValues'

interface FilterWrapperProps {
  filter: Filter
}

export function FilterWrapper({ filter }: FilterWrapperProps) {
  return (
    <div>
      <div className="px-3 py-3 text-sm font-medium">{filter.title}</div>
      <FilterValues displayType={filter.displayType} values={filter.values} />
    </div>
  )
}
