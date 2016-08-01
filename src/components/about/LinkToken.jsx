import React from 'react';

const LinkToken = (props) => {
  const { isFirstBlank, color, href, children } = props
      , _firstChart = (isFirstBlank) ? ' ' : undefined;
  return (
    <a
      className="descr__quandl-link"
      style={{color: color}}
      target="_blank"
      href={href}
    >
      {_firstChart}
      {children}
    </a>
  );
};

export default LinkToken
