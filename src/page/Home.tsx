import React, { useState } from 'react'

import { Layout } from 'fish'
import PkgSearch from '@/component/header/Search'
import Chart from '@/component/content/Chart'
import {
  PMContext,
  usePMContextRoot
} from './hook/usePMContext'

export default function Home() {
  const [targetName, setTargetName] = useState('')
  const [targetVersion, setTargetVersion] = useState('')

  return (
    <PMContext.Provider value={usePMContextRoot()}>
      <Layout
        style={{
          height: '100vh',
        }}
      >
        <PkgSearch
          setTargetName={setTargetName}
          setTargetVersion={setTargetVersion}
        />
        <Layout.Content>
          <Chart
            name={targetName}
            version={targetVersion}
          />
        </Layout.Content>
      </Layout>
    </PMContext.Provider>
  )
}
