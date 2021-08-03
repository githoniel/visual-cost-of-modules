import React, { useMemo, useState } from 'react'
import {
  Card, Button, Radio
} from 'fish'
import type { RadioChangeEvent } from '@sdp.nd/fish/es/radio'

import type { RegistryPkgInfo } from '@/lib/PackageManager'

import './style/versionChoose.less'

const tabList = [
  {
    key: 'dist-tags',
    tab: 'By Tags',
  },
  {
    key: 'versions',
    tab: 'All Versions',
  },
]

export default function VersionChoose({
  searchResult,
  setTargetVersion
}: {
  searchResult: RegistryPkgInfo,
  setTargetVersion: (version: string) => void,
}) {
  const [activeTab, setActiveTab] = useState('dist-tags')
  const [selectedVersion, setSelectedVersion] = useState<string>()

  const onRadioChange = (e: RadioChangeEvent) => {
    setSelectedVersion(e.target.value)
  }

  const contentList = useMemo(() => ({
    'dist-tags': (
      <Radio.Group onChange={onRadioChange}>
        {
          Object.keys(searchResult['dist-tags']).map((tagName) => {
            const version = searchResult['dist-tags'][tagName]
            return (
              <Radio value={version} key={version}>
                { `${tagName}: ${version}` }
              </Radio>
            )
          })
        }
      </Radio.Group>
    ),
    versions: (
      <Radio.Group onChange={onRadioChange}>
        {
          Object.keys(searchResult.versions).map((version) => (
            <Radio value={version} key={version}>
              { version }
            </Radio>
          ))
        }
      </Radio.Group>
    )
  }), [searchResult])

  const onTabChange = (key: string) => {
    setActiveTab(key)
  }

  const onConfirmVersion = () => {
    setTargetVersion(selectedVersion!)
  }

  return (
    <>
      <Card
        style={{ width: '100%', zIndex: 99 }}
        title="Choose package version"
        className="version-choose"
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={(key) => {
          onTabChange(key)
        }}
      >
        <div className="version-radio">
          {contentList[activeTab]}
        </div>
        <div className="bottom-controller">
          <span
            className="selected-version"
          >
            Selected:
            {'  '}
            {selectedVersion}
          </span>
          <Button
            type="primary"
            disabled={!selectedVersion}
            onClick={onConfirmVersion}
          >
            Confirm
          </Button>
        </div>
      </Card>
    </>
  )
}
