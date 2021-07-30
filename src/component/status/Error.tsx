import React from 'react'

export default function Error({
  error
}: {
  error: Error;
}): JSX.Element {
  return (
    <div style={{ padding: '10px' }}>
      <h1>加载组件时发生了一些异常</h1>
      <h3>
        错误信息:
      </h3>
      <pre style={{ color: 'red' }}>
        { error?.stack}
      </pre>
    </div>
  )
}
