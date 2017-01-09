import React from 'react';

import STYLE from './Link.Style'

const QUANDL_DATA_BASE = 'https://www.quandl.com/data/'
    , CAPTION = 'Quandl Data Link'

const QuandlLink = ({ dbCode='', dsCode='', caption=CAPTION }) => (
  <a
    className="descr__quandl-link"
    style={STYLE.LINK}
    href={`${QUANDL_DATA_BASE}${dbCode}/${dsCode}`}
  >
    {`${caption} ${dbCode}/${dsCode}`}
  </a>
)

export default QuandlLink
