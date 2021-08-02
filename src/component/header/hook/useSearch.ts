import { useCallback, useEffect, useState } from 'react'
import { RegistryPkgInfo } from '@/lib/PackageManager'
import { usePM } from '@/page/hook/usePMContext'
import { message } from 'fish'

export enum SearchState {
  Idle,
  Searching,
  Succ,
  Fail
}

export default function useSearch() {
  const [searchState, setSearchState] = useState<SearchState>(SearchState.Idle)
  const [searchResult, setSearchResult] = useState<RegistryPkgInfo | null>(null)

  const { pm } = usePM()

  const execSearch = useCallback(async (packageName) => {
    setSearchState(SearchState.Searching)
    setSearchResult(null)
    try {
      const result = await pm.getMetadata(packageName)
      setSearchResult(result)
      setSearchState(SearchState.Succ)
      console.log(result)
    } catch (e) {
      message.error(e.message)
      setSearchResult(e)
      setSearchState(SearchState.Fail)
    }
  }, [])

  useEffect(() => {
    if (searchState === SearchState.Idle) {
      setSearchResult(null)
    }
  }, [searchState])

  return {
    searchState,
    searchResult,
    execSearch,
    setSearchResult,
    setSearchState,
  }
}
