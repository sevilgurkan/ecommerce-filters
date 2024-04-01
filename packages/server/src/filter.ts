import qs from 'query-string'
import invariant from 'invariant'
import type { Filter } from '@repo/common'
import type { FilterConfig, FilterQueryStructure } from './types'

export function filterBuilder(filterQuery: FilterQueryStructure) {
  return {
    build: <T>(config: FilterConfig<T>) => render(filterQuery, config),
  }
}

const queryOrder = [
  'brand',
  'gender',
  'price',
  'fc',
  'pr',
  'rd',
  'sds',
  'sst',
  'cursor',
  'limit',
]

const stringfyOptions: qs.StringifyOptions = {
  arrayFormat: 'comma',
  skipEmptyString: true,
  skipNull: true,
  sort: (a, b) => queryOrder.indexOf(a) - queryOrder.indexOf(b),
}

function render<T>(
  filterQuery: FilterQueryStructure,
  config: FilterConfig<T>
): Filter {
  const {
    title,
    displayType,
    type,
    order,
    textField,
    values,
    filteredFn,
    countFn,
  } = config

  invariant(
    typeof textField === 'string' || typeof textField === 'function',
    'textField property must be a string or function'
  )

  const groupHndler = getGroupHandler(filterQuery)
  const handler = groupHndler[type]

  function textHandler(value: T) {
    return typeof textField === 'string'
      ? String(value[textField])
      : textField(value)
  }

  /**
   * NOTE:
   * The query generated for each filter always PRESERVES the existing query in the URL.
   *
   * If the filter is already exists in the current query,
   * we remove the filter from the newly generated query.
   * This way, when the user clicks the link again to remove the active filter,
   * the filter will be inactive in the new request result. Or vice versa.
   *
   * let's assume brand id 152 for the filter being processed:
   * -- if 152 is NOT IN the query, it will be added to the query:
   *    => ?brand=227,152&gender=1
   * -- if 152 is IN the query, it will be removed from the query:
   *    => ?brand=227&gender=1
   */
  function queryHandler(filterId: string | number | boolean) {
    const newIds = handler.setIds(type, filterId)
    return qs.stringify({ ...filterQuery, ...newIds }, stringfyOptions)
  }

  return {
    title,
    displayType,
    type,
    order,
    totalCount: values.length,
    values: values.map(value => {
      return {
        id: String(value.id),
        text: textHandler(value),
        type,
        filtered: filteredFn?.(value) ?? handler.hasId(type, value.id),
        count: countFn?.(value) ?? 0,
        url: queryHandler(value.id),
      }
    }),
  }
}

function getGroupHandler(query: FilterQueryStructure): {
  [key: string]: QueryHandler
} {
  return {
    brand: arrayHandler(query.brand),
    gender: arrayHandler(query.gender),
    price: primiviteHandler(query.price),
    fc: primiviteHandler(query.fc),
    pr: primiviteHandler(query.pr),
    rd: primiviteHandler(query.rd),
    sds: primiviteHandler(query.sds),
  }
}

type QueryHandler = {
  hasId: (type: string, id: any) => boolean
  setIds: (type: string, id: any) => object
}

const arrayHandler = (queryIds?: any[]): QueryHandler => {
  const ids = queryIds ?? []

  const hasId = (_type: string, id: number | string) => ids.includes(id)

  const toggleId = (_type: string, id: number | string) => {
    const newIds = ids.includes(id)
      ? ids.filter(currentId => currentId !== id)
      : ids.concat(id)
    return newIds
  }

  const setIds = (type: string, id: number | string) => {
    const newIds = toggleId(type, id)
    return { [type]: newIds }
  }

  return {
    hasId,
    setIds,
  }
}

const primiviteHandler = (queryId?: string | boolean): QueryHandler => {
  const hasId = (_type: string, id: string) => id === String(queryId)

  const toggleId = (type: string, id: string) => (hasId(type, id) ? null : id)

  const setIds = (type: string, id: string) => {
    return { [type]: toggleId(type, id) }
  }

  return {
    hasId,
    setIds,
  }
}
