import React from 'react';

import InputSelect from '../../zhn-select/InputSelect';
import useRowOptions from './useRowOptions'

const RowInputSelect = (props) => {
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
        <InputSelect {...options} />
    </div>
  );
};


export default RowInputSelect
