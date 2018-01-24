import React from 'react'

import Link from './Link'

const CL = "native-link";
const URL = 'https://www.cryptocompare.com/coins/';

const CrcLink = ({ item, style }) =>
<Link
  className={CL}
  style={style}
  caption={`CryptoCompare Overview (${item})`}
  href={`${URL}${item}/overview`}
/>

export default CrcLink
