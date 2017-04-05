import React from 'react'

const STYLE = {
  ROOT : {
    color: '#FDB316',
    fontWeight : 'bold'
  }
}

const SpanDate = ({ date, style }) => (
  <span style={{...STYLE.ROOT, ...style}}>
    {date}
  </span>
)

export default SpanDate
