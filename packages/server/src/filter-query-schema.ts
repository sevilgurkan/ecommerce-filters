import { z } from 'zod'
import { SSTKeys, sstKeys } from '@repo/common'

const numberTransform = (value: any) => {
  return isNaN(Number(value)) ? z.INVALID : Number(value)
}

const sstTransform = (value: string) => {
  return sstKeys.includes(value as SSTKeys) ? value : z.INVALID
}

const priceTransform = (value: string) => {
  const convertParam = (value?: string) => {
    if (!value) return z.INVALID

    const splitted = value.split('-')
    if (splitted.length !== 2) return z.INVALID

    const [minStr, maxStr] = splitted

    if (isNaN(Number(minStr))) return z.INVALID
    if (maxStr !== '*' && isNaN(Number(maxStr))) return z.INVALID

    return value
  }

  if (typeof value === 'string') {
    return convertParam(value)
  }

  return z.INVALID
}

const numberIdTransform = (value: string | number | any[]) => {
  const type = typeof value

  const isNumber = (v: any) => !isNaN(Number(v))

  switch (type) {
    case 'string':
      if (!isNumber(value)) return z.INVALID
      return [Number(value)]
    case 'number':
      return [value]
    case 'object':
      if (Array.isArray(value)) {
        return value.filter(v => typeof v === 'number')
      }
    default:
      z.INVALID
  }
}

const booleanTransform = (value: string | boolean) => {
  return value === 'true' || value === true ? true : z.INVALID
}

const resultTransform = (value: any) => {
  return Object.entries(value).reduce((res, [key, value]) => {
    if (value === z.INVALID) return res

    return {
      ...res,
      [key]: value,
    }
  }, {})
}

const quickFilterId = z
  .union([z.boolean(), z.string()])
  .transform(booleanTransform)
  .optional()

const numberId = z
  .union([z.string(), z.number(), z.array(z.any())])
  .transform(numberIdTransform)
  .optional()

const priceId = z.string().transform(priceTransform).optional()

const paginationId = z
  .union([z.string(), z.number()])
  .transform(numberTransform)
  .optional()

const sstId = z.string().transform(sstTransform).optional()

/**
 * @example
 *  "?brand=588,623,107&gender=1&price=5000-10000&fc=true&sds=true&sst=PRICE_BY_ASC&cursor=0&limit=10"
 *
 *  {
 *    brand: [ 588, 623, 107 ],
 *    gender: [ 1 ],
 *    price: '5000-10000',
 *    fc: true,
 *    sds: true,
 *    sst: 'PRICE_BY_ASC'
 *    cursor: 0,
 *    limit: 10
 *  }
 */
export const filterQueryReqSchema = z
  .object({
    brand: numberId,
    gender: numberId,
    price: priceId,
    limit: paginationId,
    cursor: paginationId,
    pr: quickFilterId,
    fc: quickFilterId,
    rd: quickFilterId,
    sds: quickFilterId,
    sst: sstId,
  })
  .transform(resultTransform)
