import React from 'react'

const STYLE = {
  ROOT : {
    color : '#2F7ED8',
    fontWeight : 'bold',
    whiteSpace: 'nowrap'
  }
}

const SpanValue = ({ value, style }) => (
  <span style={{...STYLE.ROOT, ...style}}>
    {value}
  </span>
)

export default SpanValue
