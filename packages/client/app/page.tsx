import { getFilters } from '@/lib/api'
import { FilterProvider } from '@/components/FilterProvider'
import { SearchApp } from '@/components/SearchApp'

type SearchParams = Record<string, string>

interface HomeProps {
  searchParams: SearchParams
}

export default async function Home({ searchParams }: HomeProps) {
  const { payload: filters } = await getFilters(searchParams)

  if (!filters) {
    throw new Error(
      'Filters not found. Try refreshing the page or check the server files.'
    )
  }

  return (
    <div className="w-[1200px] mx-auto">
      <FilterProvider filters={filters}>
        <SearchApp />
      </FilterProvider>
    </div>
  )
}
