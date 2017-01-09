import React from 'react';

import STYLE from './Link.Style';

const EURONEXT_BASE = 'https://www.euronext.com/en/products/equities/'
    , CAPTION = 'Euronext Link'

const EuronextLink = ({ item={}, caption=CAPTION }) => (
  <a
    className="native-link"
    style={STYLE.LINK}
    href={`${EURONEXT_BASE}${item.isin}-${item.market}`}
  >
    {`${caption} ${item.caption}`}
  </a>
)

export default EuronextLink
