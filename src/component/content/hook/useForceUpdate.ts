import { useState, useEffect } from 'react'

export default function useForceUpdate() {
  const [updateFlag, setUpdateFlag] = useState(0)
  const [forceUpdate, setForceUpdate] = useState(() => setUpdateFlag)

  // 加一个中间层缓存`setUpdateFlag`, 是为了避免在组件已经卸载的情况下，调用`setUpdateFlag`
  // 虽然无所谓，但是react会有警告
  useEffect(() => {
    setForceUpdate(() => setUpdateFlag)
    return () => {
      // 卸载时设置为空函数
      setForceUpdate(() => () => {})
    }
  }, [])

  return {
    updateFlag,
    forceUpdate: () => {
      forceUpdate((x) => x + 1)
    }
  }
}
