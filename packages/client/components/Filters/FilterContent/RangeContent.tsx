import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { FilterContentProps } from './types'
import { ValueLabel } from './ValueLabel'
import { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { useFilter } from '@/components/FilterProvider'

export function RangeContent({ filterValues }: FilterContentProps) {
  const { onFilter } = useFilter()
  const [minInput, setMinInput] = useState('')
  const [maxInput, setMaxInput] = useState('')

  const handleMinInputChange = (value: string) => {
    if (isNaN(Number(value))) return
    setMinInput(value)
  }

  const handleMaxInputChange = (value: string) => {
    if (isNaN(Number(value)) || value === '0') return
    setMaxInput(value)
  }

  const parseInput = (input: string, defaultValue: string = '0') => {
    return parseInt(input || defaultValue, 10)
  }

  const swapInputsIfMaxLesserThanMin = (
    min: number,
    max: number
  ): [number, number] => {
    return max !== 0 && max < min ? [max, min] : [min, max]
  }

  const handleInfinity = (value: number): string | number =>
    value === 0 ? '*' : value

  const handleSearchClick = () => {
    const parsedMin = parseInput(minInput)
    const parsedMax = parseInput(maxInput)

    let [min, max] = swapInputsIfMaxLesserThanMin(parsedMin, parsedMax)

    // If max is 0, it means it's infinity
    // so we should use * instead of 0 to get all products
    const maxParam = handleInfinity(max)
    const minParam = min

    setMinInput(String(min))
    if (maxParam !== '*') setMaxInput(String(max))

    onFilter({ key: 'price', value: `${minParam}-${maxParam}` })
  }

  const handleLinkClick = (filterId: string) => {
    const [min, max] = filterId.split('-')
    setMinInput(min)
    setMaxInput(max)
  }

  return (
    <>
      <div className="flex ">
        <Input
          type="text"
          className="h-[24px] w-[60px] text-xs pl-1 pr-2"
          placeholder="En Az"
          value={minInput}
          onChange={e => handleMinInputChange(e.target.value)}
        />
        <span className="mx-1">-</span>
        <Input
          type="text"
          className="h-[24px] w-[60px] text-xs pl-1 pr-2"
          placeholder="En Çok"
          value={maxInput}
          onChange={e => handleMaxInputChange(e.target.value)}
        />
        <button
          disabled={!minInput && !maxInput}
          className="bg-brand w-[28px] ml-auto h-[24px] flex items-center justify-center rounded-md disabled:bg-gray-500"
          onClick={handleSearchClick}
        >
          <SearchIcon className="size-4 text-white" />
        </button>
      </div>

      {filterValues.map(filter => {
        return (
          <Link
            href={`?${filter.url}`}
            key={filter.id}
            className="flex items-center space-x-2"
            onClick={() => handleLinkClick(filter.id)}
          >
            <div
              className={cn(
                'shrink-0 border-[1px] size-[18px] rounded-full flex items-center justify-center',
                filter.filtered
                  ? 'border-brand bg-brand'
                  : 'border-gray-300 bg-white'
              )}
            >
              {filter.filtered && (
                <div className=" border-r-[2px] border-b-[2px] border-white h-[10px] leading-[18px] w-[5px] rotate-45" />
              )}
            </div>
            <ValueLabel>{filter.text}</ValueLabel>
          </Link>
        )
      })}
    </>
  )
}
