const S = {
  color: '#1b75bb',
  fontSize: '16px',
  fontWeight: 'bold'
}

const SpanLabel = ({ label, style }) => (
  <span style={{...S, ...style}}>
    {label}
  </span>
)

export default SpanLabel
