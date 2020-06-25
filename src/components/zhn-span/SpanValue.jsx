import React from 'react'

const S = {  
  color: '#2f7ed8',
  fontWeight : 'bold',
  whiteSpace: 'nowrap'
}

const SpanValue = ({ value, style }) => (
  <span style={{...S, ...style}}>
    {value}
  </span>
)

export default SpanValue
