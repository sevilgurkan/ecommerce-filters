import { Express } from 'express'

import { readFiltersSeedFiles } from '../seed.db'
import { filterQueryMiddleware } from '../middlewares'
import { filterBuilder } from '../filter'
import { BaseResponse } from '../handlers'

export function filtersRoute(app: Express) {
  app.get('/filters', filterQueryMiddleware, async (req, res) => {
    try {
      const [
        brandsSeed,
        sortTypesSeed,
        categoriesSeed,
        priceRangesSeed,
        quickFiltersSeed,
        brandProductsSeed,
        categoryProductsSeed,
      ] = await readFiltersSeedFiles()

      const filterQuery = req.__parsedQuery

      const genders = categoriesSeed.filter(c => c.type === 'gender')

      const builder = filterBuilder(filterQuery)

      const brandFilter = builder.build({
        type: 'brand',
        title: 'Marka',
        displayType: 'list',
        order: 1,
        values: brandsSeed,
        textField: 'text',
        countFn: brand => brandProductsSeed[brand.id].length,
      })

      const genderFilter = builder.build({
        type: 'gender',
        title: 'Cinsiyet',
        displayType: 'list',
        order: 2,
        values: genders,
        textField: 'name',
        countFn: gender => categoryProductsSeed[gender.id].length,
      })

      const priceFilter = builder.build({
        type: 'price',
        title: 'Fiyat',
        displayType: 'range',
        order: 3,
        values: priceRangesSeed,
        textField: range => `${range.start} TL - ${range.end} TL`,
      })

      const quickFilters = quickFiltersSeed.map((qf, index) => {
        return builder.build({
          type: qf.key,
          title: qf.text,
          displayType: 'toggle',
          textField: 'text',
          order: index + 1,
          values: [{ id: qf.id, text: qf.text, key: qf.key }],
        })
      })

      return BaseResponse.success(res, {
        payload: {
          aggregations: [brandFilter, genderFilter, priceFilter],
          quickFilters,
          sortTypes: sortTypesSeed,
        },
      })
    } catch (error) {
      console.log(error)

      return BaseResponse.failure(res, {
        message: 'Something went wrong',
      })
    }
  })
}
