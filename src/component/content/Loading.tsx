import React, { useEffect, useState } from 'react'
import { Alert } from 'antd'
import { SearchState } from '../header/hook/useSearch'

export default function Loading({
  message,
  status
}: {
  message: string,
  status: SearchState | undefined
}) {
  let type: 'info' | 'success' | 'error' | undefined
  switch (status) {
    case SearchState.Searching:
      type = 'info'
      break
    case SearchState.Succ:
      type = 'success'
      break
    case SearchState.Fail:
      type = 'error'
      break
    // no default
  }

  const [hide, setHide] = useState(false)
  useEffect(() => {
    setHide(false)
    let setTimeoutId: number
    if (type === 'success') {
      setTimeoutId = window.setTimeout(() => {
        setHide(true)
      }, 3000)
    }
    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [type])

  return (
    <>
      {
        type && !hide && (
          <Alert
            message={message}
            closable={type === 'success'}
            type={type}
          />
        )
      }
    </>
  )
}
