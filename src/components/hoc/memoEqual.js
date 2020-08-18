import React from 'react'

const memoEqual = (Element, areEqualProps=()=>true) =>
  React.memo(Element, areEqualProps)

export default memoEqual
