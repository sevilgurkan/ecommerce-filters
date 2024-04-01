import type { FilterDisplayType, SSTKeys } from '@repo/common'

export type QuickFilter = {
  key: string
  id: string
  filterField: string
  text: string
}

export type SortType = {
  key: SSTKeys
  text: string
}

export type ConfigFilterValue<T = object> = T & { id: number | string }
export type TextField<TKey> = TKey extends string ? TKey : never

export type FilterConfig<TValue> = {
  type: string
  displayType: FilterDisplayType
  title: string
  order: number
  values: ConfigFilterValue<TValue>[]
  textField: TextField<keyof TValue> | ((value: TValue) => string)
  filteredFn?(value: TValue): boolean
  countFn?(value: TValue): number
}

export type FilterQueryStructure = {
  brand?: number[]
  gender?: number[]
  price?: string
  pr?: boolean
  rd?: boolean
  sds?: boolean
  fc?: boolean
  cursor?: number
  limit?: number
  sst?: SSTKeys
}

export type FilterQueryStructureFields = keyof FilterQueryStructure
