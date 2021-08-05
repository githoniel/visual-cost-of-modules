import { useState } from 'react'

export default function useActivePanel() {
  const [info, setCurrentInfo] = useState<{
    type: 'edge' | 'node'
    info: Object
  }>()

  return {
    info,
    setCurrentInfo
  }
}
