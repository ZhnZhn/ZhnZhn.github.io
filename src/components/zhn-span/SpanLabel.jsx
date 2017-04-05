import React from 'react'

const STYLE = {
  ROOT : {
    color: '#1b75bb',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}

const SpanLabel = ({ label, style }) => (
  <span style={{...STYLE.ROOT, ...style}}>
    {label}
  </span>
)

export default SpanLabel
