import React, { useState } from 'react'
import {
  Button, Card, Input, Select, Checkbox
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
  cyInstance,
  setLayoutOption,
  setFixedSize,
  forceUpdate
}: {
  layoutOption: any,
  cyInstance: any
  setLayoutOption: (value: any) => void,
  setFixedSize: (value: boolean) => void,
  forceUpdate: () => void
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

  const findRoot = () => {
    if (cyInstance) {
      const node = cyInstance.elements()[0]
      cyInstance.fit(node, 100)
    }
  }

  const relayout = () => {
    if (cyInstance) {
      if (cyInstance) {
        cyInstance.layout(layoutOption)
          .run()
      }
    }
  }

  const onSizeChange = (e) => {
    const isChecked = e.target.checked
    setFixedSize(!isChecked)
    forceUpdate()
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
                placeholder="input registry, end with `/`"
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
              <span>
                DisplaySize:
              </span>
              <Checkbox
                defaultChecked
                onChange={onSizeChange}
              >
                package size
              </Checkbox>
            </div>
            <br />
            <div>
              <Button onClick={findRoot}>Go to Root</Button>
              <span>{' '}</span>
              <Button onClick={relayout}>Refresh Layout</Button>
            </div>
          </Card>
        )
      }
    </>
  )
}
