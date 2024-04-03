'use client'
import React, { useState } from 'react'
import { ArrowDownUpIcon } from 'lucide-react'
import { SSTKeys } from '@repo/common'
import { useFilter } from './FilterProvider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function SearchSortFilters() {
  const { filters, onFilter } = useFilter()

  const sortTypes = filters.sortTypes

  const [currentSST, setCurrentSST] = useState(sortTypes[0].text)

  function handleSSTChange(text: string, sstKey: SSTKeys) {
    setCurrentSST(text)
    onFilter({ key: 'sst', value: sstKey })
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="border px-2 py-1 rounded-md text-sm flex items-center justify-between min-w-[220px]">
          <span>{currentSST}</span>
          <ArrowDownUpIcon className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[220px]">
          {sortTypes.map(sst => (
            <DropdownMenuItem
              key={sst.key}
              onSelect={() => handleSSTChange(sst.text, sst.key)}
            >
              {sst.text}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
