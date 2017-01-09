import React from 'react';

import STYLE from './Link.Style';

const NASDAQ_BASE = 'https://www.nasdaq.com/symbol/'
    , CAPTION = 'NASDAQ Link';

const NasdaqLink = ({ item={}, caption=CAPTION, style }) => {
  const { text='', value } = item
      , _ticket = (value)
            ? value.trim()
            : text.split('-')[0].trim()
  return (
    <a
      className="native-link"
      style={Object.assign({}, STYLE.LINK, style)}
      href={`${NASDAQ_BASE}${_ticket}`}
    >
      {`${caption} ${_ticket}`}
    </a>
  );
}

export default NasdaqLink
