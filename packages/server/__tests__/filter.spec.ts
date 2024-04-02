import { describe, test, expect } from 'vitest'
import qs from 'query-string'
import { Brand, Category, PriceRange } from '@repo/common'
import { filterBuilder } from '../src/filter'
import { FilterConfig } from '../src/types'
import { filterQueryReqSchema } from '../src/filter-query-schema'

describe('Filters', () => {
  test('should return a function when called with filterQuery', () => {
    const result = filterBuilder({})
    expect(typeof result.build).toBe('function')
  })

  test('parse query', () => {
    const query = `
    ?brand=588,623,107,,,-asdf,g@$3532
    &gender=1,sdf
    &price=5000-qGd-30s2
    &fc=true
    &sds=trueesf
    &sst=PRICE_bY_@__ASC
    &cursor=0
    &limit=10 
    `.replace(/\s/g, '')

    const invalidParsedQuery = qs.parse(query, {
      arrayFormat: 'comma',
      parseBooleans: true,
      parseNumbers: true,
    })

    const validQuery = filterQueryReqSchema.parse(invalidParsedQuery)

    expect(invalidParsedQuery).toEqual({
      brand: [588, 623, 107, '', '', '-asdf', 'g@$3532'],
      gender: [1, 'sdf'],
      price: '5000-qGd-30s2',
      fc: true,
      sds: 'trueesf',
      sst: 'PRICE_bY_@__ASC',
      cursor: 0,
      limit: 10,
    })

    expect(validQuery).toEqual({
      brand: [588, 623, 107],
      gender: [1],
      fc: true,
      cursor: 0,
      limit: 10,
    })
  })

  describe('Filter Config', () => {
    const filterQuery = {
      brand: [588, 623],
      gender: [1],
      price: '5000-10000',
      fc: true,
      sds: true,
    }

    const builder = filterBuilder(filterQuery)

    test('should return correct brand filter', () => {
      const brands = [
        { id: 588, name: 'brand1', text: 'Brand 1' },
        { id: 28, name: 'brand2', text: 'Brand 2' },
        { id: 107, name: 'brand3', text: 'Brand 3' },
      ]

      const brandConfig: FilterConfig<Brand> = {
        title: 'Marka',
        displayType: 'list',
        type: 'brand',
        order: 1,
        textField: 'name',
        values: brands,
      }

      const brandFilter = builder.build(brandConfig)

      expect(brandFilter.values[0].url).toBe(
        'brand=623&gender=1&price=5000-10000&fc=true&sds=true'
      )
      expect(brandFilter.values[1].url).toBe(
        'brand=588,623,28&gender=1&price=5000-10000&fc=true&sds=true'
      )
      expect(brandFilter.values[2].url).toBe(
        'brand=588,623,107&gender=1&price=5000-10000&fc=true&sds=true'
      )

      for (const filter of brandFilter.values) {
        const isFiltered = filterQuery.brand.includes(Number(filter.id))
        expect(filter.filtered).toBe(isFiltered)
      }
    })

    test('should return correct gender filter', () => {
      const genders = [
        { id: 1, name: 'Kadın', type: 'gender' },
        { id: 2, name: 'Erkek', type: 'gender' },
      ]

      const genderConfig: FilterConfig<Category> = {
        title: 'Cinsiyet',
        displayType: 'list',
        type: 'gender',
        order: 2,
        textField: 'name',
        values: genders,
      }

      const genderFilter = builder.build(genderConfig)

      expect(genderFilter.values[0].url).toBe(
        'brand=588,623&price=5000-10000&fc=true&sds=true'
      )
      expect(genderFilter.values[1].url).toBe(
        'brand=588,623&gender=1,2&price=5000-10000&fc=true&sds=true'
      )
    })

    test('should return correct price filter', () => {
      const prices = [
        { id: '0-5000', start: 0, end: 5000 },
        { id: '5000-10000', start: 5000, end: 10000 },
        { id: '10000-15000', start: 10000, end: 15000 },
      ]

      const priceConfig: FilterConfig<PriceRange> = {
        type: 'price',
        title: 'Fiyat',
        displayType: 'range',
        order: 3,
        values: prices,
        textField: range => `${range.start} TL - ${range.end} TL`,
      }

      const priceFilter = builder.build(priceConfig)

      expect(priceFilter.values[0].url).toBe(
        'brand=588,623&gender=1&price=0-5000&fc=true&sds=true'
      )
      expect(priceFilter.values[1].url).toBe(
        'brand=588,623&gender=1&fc=true&sds=true'
      )
      expect(priceFilter.values[2].url).toBe(
        'brand=588,623&gender=1&price=10000-15000&fc=true&sds=true'
      )

      for (const filter of priceFilter.values) {
        const [start, end] = filter.id.split('-')
        expect(filter.text).toBe(`${start} TL - ${end} TL`)
      }
    })
  })
})
