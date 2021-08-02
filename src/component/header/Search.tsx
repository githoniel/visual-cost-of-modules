import React from 'react'
import { Layout, Input } from 'fish'
import VersionChoose from './VersionChoose'
import useSearch, { SearchState } from './hook/useSearch'

const { Search } = Input

export default function PkgSearch({
  setTargetName,
  setTargetVersion
}: {
  setTargetName: (name: string) => void,
  setTargetVersion: (version: string) => void,
}) {
  const {
    searchState,
    searchResult,
    execSearch,
    setSearchState
  } = useSearch()

  const onSearch = (value: string) => {
    if (value) {
      execSearch(value)
    }
  }

  const onSetTargetVersion = (version: string) => {
    setSearchState(SearchState.Idle)
    setTargetName(searchResult!.name)
    setTargetVersion(version)
  }

  return (
    <Layout.Header>
      <Search
        style={{
          marginTop: '15px',
        }}
        placeholder="input package name"
        enterButton
        loading={searchState === SearchState.Searching}
        onSearch={onSearch}
      />
      {
        searchState === SearchState.Succ && searchResult && (
          <VersionChoose
            searchResult={searchResult}
            setTargetVersion={onSetTargetVersion}
          />
        )
      }
    </Layout.Header>
  )
}
