import React from 'react'

import Link from './Link'

const URL = 'https://www.cryptocompare.com/coins/';

const CrcLink = ({ item, style }) => (
  <Link
    style={style}
    caption={`CryptoCompare Overview (${item})`}
    href={`${URL}${item}/overview`}
  />
)

export default CrcLink
