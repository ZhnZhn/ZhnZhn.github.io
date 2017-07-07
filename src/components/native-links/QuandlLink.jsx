import React from 'react';

import Link from './Link'

const QUANDL_DATA_BASE = 'https://www.quandl.com/data/'
    , CAPTION = 'Quandl Data Link';

const QuandlLink = ({ dbCode='', dsCode='', caption=CAPTION }) =>
  <Link
    className="descr__quandl-link"
    href={`${QUANDL_DATA_BASE}${dbCode}/${dsCode}`}
    caption={`${caption} ${dbCode}/${dsCode}`}
  />


export default QuandlLink
