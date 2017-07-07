import React from 'react'

import Link from './Link'

const NASDAQ_BASE = 'https://www.nasdaq.com/symbol/'
    , CAPTION = 'NASDAQ Link';

const NasdaqLink = ({ item={}, caption=CAPTION, style }) => {
  const { text='', value } = item
      , _ticket = (value)
            ? value.trim()
            : text.split('-')[0].trim();
  return (
    <Link
      className="native-link"
      style={style}
      href={`${NASDAQ_BASE}${_ticket}`}
      caption={`${caption} ${_ticket}`}
    />
  );
}

export default NasdaqLink
