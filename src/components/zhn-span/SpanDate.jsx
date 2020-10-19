const S = {
  color: '#fdb316',
  fontWeight: 'bold'
}

const SpanDate = ({ date, style }) => (
  <span style={{...S, ...style}}>
    {date}
  </span>
)

export default SpanDate
