import React from 'react'
import { Routes } from '@gem-mine/durex-router'
import Footer from './Footer'

export default function Simple(): JSX.Element {
  return (
    <>
      <Routes path="demo.simple" />
      <Footer />
    </>
  )
}
