import React, { useEffect, useState } from 'react'
import { Card, Icon, Button } from 'fish'
import { GraphNodeScratch } from '@/lib/BuildDataEvent'
import './style/pkgInfo.less'

export default function PkgInfo({
  info
}: {
  info: GraphNodeScratch
}) {
  const [show, setIsShow] = useState(false)

  useEffect(() => {
    if (info) {
      setIsShow(true)
    }
  }, [info])

  return (
    <>
      {
        show && (
          <Card
            className="pkg-info-card"
            title={info.detail.name}
            extra={(
              <Button
                type="text"
                shape="circle"
                icon={<Icon type="close" />}
              />
        )}
          >
            <p>卡片内容</p>
            <p>卡片内容</p>
            <p>卡片内容</p>
          </Card>
        )
      }
    </>
  )
}
