import React, { useEffect, useState } from 'react'
import { Card, Icon, Button } from 'fish'
import prettyBytes from 'pretty-bytes'
import { GraphNodeScratch } from '@/lib/BuildDataEvent'
import './style/pkgInfo.less'

export interface EdgeInfo {
  requirePkg: string[]
  requiredByPkg: string[]
}

export default function PkgInfo({
  info
}: {
  info: (GraphNodeScratch & EdgeInfo) | {
    source: string,
    target: string
  }
}) {
  const [show, setIsShow] = useState(false)

  useEffect(() => {
    if (info) {
      setIsShow(true)
    }
  }, [info])

  const close = () => {
    setIsShow(false)
  }

  const isNode = !!(info as GraphNodeScratch).detail
  const nodeInfo = info as GraphNodeScratch & EdgeInfo
  const edgeInfo = info as {
    source: string,
    target: string
  }
  return (
    <>
      {
        show && (
          <Card
            size="small"
            className="pkg-info-card"
            title={
              isNode
                ? (nodeInfo).detail.name
                : 'Dependency'
            }
            extra={(
              <Button
                type="text"
                shape="circle"
                icon={(
                  <Icon
                    onClick={
                      close
                    }
                    type="close"
                  />
                  )}
              />
            )}
          >
            { isNode ? (
              <>
                <p className="line">
                  <div className="title">
                    version
                  </div>
                  <div className="value">
                    {nodeInfo.detail.version}
                  </div>
                </p>
                <p className="line">
                  <div className="title">
                    size
                  </div>
                  <div className="value">
                    {prettyBytes(nodeInfo.detail.dist.size)}
                  </div>
                </p>
                <p className="line">
                  <div className="title">
                    tarball
                  </div>
                  <div className="value">
                    <a href={nodeInfo.detail.dist.tarball}>
                      click to download
                    </a>
                  </div>
                </p>
                <p className="line">
                  <div className="title">
                    npm page
                  </div>
                  <div className="value">
                    <a
                      href={`https://www.npmjs.com/${nodeInfo.detail.name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      click to visite
                    </a>
                  </div>
                </p>
                <p className="line">
                  <div className="title">
                    require
                  </div>
                  <div className="value">
                    {
                      nodeInfo.requirePkg.map((name) => (
                        <div>{name}</div>
                      ))
                    }
                  </div>
                </p>
                <p className="line">
                  <div className="title">
                    required by
                  </div>
                  <div className="value">
                    {
                      nodeInfo.requiredByPkg.map((name) => (
                        <div>{name}</div>
                      ))
                    }
                  </div>
                </p>
              </>
            ) : (
              <>
                <p className="line">
                  <div className="title">
                    package
                  </div>
                  <div className="value">
                    {edgeInfo.source}
                  </div>
                </p>
                <p className="line">
                  <div className="title">
                    required by
                  </div>
                  <div className="value">
                    {edgeInfo.target}
                  </div>
                </p>
              </>

            )}
          </Card>
        )
      }
    </>
  )
}
