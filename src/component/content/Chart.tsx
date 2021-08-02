import React from 'react'

export default function Chart({
  name,
  version
}: {
  name: string,
  version: string,
}) {
  if (!name || !version) {
    return (<div>sadasdasd</div>)
  } else {
    return (<div>123123123</div>)
  }
}
