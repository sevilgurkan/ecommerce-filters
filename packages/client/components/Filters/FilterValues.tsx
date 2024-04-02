import type { FilterValue, FilterDisplayType } from '@repo/common'
import React from 'react'
import { ListContent, RangeContent, ToggleContent } from './FilterContent'

function getTypedFilterComponent(displayType: FilterDisplayType) {
  switch (displayType) {
    case 'list':
      return ListContent
    case 'range':
      return RangeContent
    case 'toggle':
      return ToggleContent
  }
}

interface FilterValuesProps {
  displayType: FilterDisplayType
  values: FilterValue[]
}

export function FilterValues({ displayType, values }: FilterValuesProps) {
  const TypedComponent = getTypedFilterComponent(displayType)
  return (
    <div className="px-3 mb-3 space-y-2">
      <TypedComponent filterValues={values} />
    </div>
  )
}
