import type { FilterContentProps } from './types'
import { useState } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { ValueLabel } from './ValueLabel'

export function ListContent({ filterValues }: FilterContentProps) {
  const [searchText, setSearchText] = useState('')

  const searchedValues = searchText
    ? filterValues.filter(fv =>
        fv.text.toLowerCase().includes(searchText.toLowerCase())
      )
    : filterValues

  const handleSearchInput = (text: string) => {
    setSearchText(text)
  }

  return (
    <>
      <div>
        <Input
          type="text"
          className="h-[24px]"
          value={searchText}
          onChange={e => handleSearchInput(e.target.value)}
        />
      </div>

      {searchedValues.map(filter => {
        return (
          <Link
            href={`?${filter.url}`}
            key={filter.id}
            className="group flex items-center space-x-2"
          >
            <div
              className={cn(
                'shrink-0 border-[1px] size-[18px] flex items-center justify-center rounded-sm',
                filter.filtered
                  ? 'border-brand bg-brand'
                  : 'border-gray-300 bg-white'
              )}
            >
              {filter.filtered && (
                <div className=" border-r-[2px] border-b-[2px] border-white h-[10px] leading-[18px] w-[5px] rotate-45" />
              )}
            </div>

            <ValueLabel className="group-hover:text-gray-400">
              {filter.text}
            </ValueLabel>
          </Link>
        )
      })}
    </>
  )
}
