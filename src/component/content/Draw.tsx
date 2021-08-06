import React, { useState } from 'react'
import {
  Button, Card, Input, Select
} from 'antd'
import {
  SettingOutlined,
  CloseOutlined
} from '@ant-design/icons'
import './style/draw.less'
import { usePM } from '@/page/hook/usePMContext'
import { LayoutEnum, LayoutOption } from './const'

const { Option } = Select

export default function GraphDraw({
  layoutOption,
  setLayoutOption,
  cyInstance
}: {
  layoutOption: any,
  setLayoutOption: (value: any) => void,
  cyInstance: any
}) {
  const { pm } = usePM()
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  function handleChange(value: string) {
    setLayoutOption(LayoutOption[value])
    if (cyInstance) {
      cyInstance.layout(LayoutOption[value])
        .run()
    }
  }

  const FindRoot = () => {
    if (cyInstance) {
      const node = cyInstance.elements()[0]
      cyInstance.fit(node, 100)
    }
  }
  return (
    <>
      <div className="draw-opener">
        <Button
          type="text"
          shape="circle"
          icon={(
            <SettingOutlined
              onClick={
                showDrawer
              }
            />
        )}
        />
      </div>
      {
        visible && (
          <Card
            className="draw-setting"
            size="small"
            title="Graph"
            extra={(
              <Button
                type="text"
                shape="circle"
                icon={(
                  <CloseOutlined
                    onClick={onClose}
                  />
                )}
              />
            )}
            style={{ width: 400, }}
          >
            <div>
              <Input.Search
                placeholder="输入搜索文本"
                defaultValue={pm.registry}
                enterButton="OK"
                onSearch={(value: string) => {
                  pm.registry = value
                  pm.cache = {}
                }}
              />
            </div>
            <br />
            <div>
              <span>
                Layout:
              </span>
              <Select
                defaultValue={layoutOption.name}
                style={{ width: 120 }}
                onChange={handleChange}
              >
                {
                  Object.keys(LayoutEnum).map((key) => (
                    <Option
                      value={LayoutEnum[key]}
                      key={key}
                    >
                      {key}
                    </Option>
                  ))
                }
              </Select>
            </div>
            <br />
            <div>
              <Button onClick={FindRoot}>GoTo Root</Button>
            </div>
          </Card>
        )
      }
    </>
  )
}
