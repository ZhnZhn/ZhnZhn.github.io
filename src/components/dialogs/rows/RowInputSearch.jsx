import React from 'react';

import InputSearch from '../../zhn-search/InputSearch';
import useRowOptions from './useRowOptions'

const RowInputSearch = (props) => {
  const {
    rowStyle, labelStyle,
    caption,
    options
  } = useRowOptions(props);

  return (
     <div style={rowStyle}>
        <span style={labelStyle}>
           {caption}
        </span>
        <InputSearch {...options} />
    </div>
  );
};


export default RowInputSearch
