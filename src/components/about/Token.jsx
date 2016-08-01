import React from 'react';

const Token = (props) => {
  const { isFirstBlank, color, children } = props
      , _firstChart = (isFirstBlank) ? ' ' : undefined
  return (
     <span style={{color: color, fontWeight: 'bold'}}>
        {_firstChart}
        {children}
     </span>
  );
};

export default Token
