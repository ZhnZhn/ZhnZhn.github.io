import React from 'react'

const withProps = overrideProps => BaseComponent => props =>
  <BaseComponent {...props} {...overrideProps} />

export default withProps
