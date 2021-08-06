import React from 'react'
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
  return (
    <>
      {
        type && (
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
