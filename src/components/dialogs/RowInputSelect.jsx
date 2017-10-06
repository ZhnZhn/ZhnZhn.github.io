import React from 'react';

import InputSelect from '../zhn-select/InputSelect';
import STYLE from '../styles/DialogStyles';

const RowInputSelect = ({ caption='', ...rest }) => {
  const _caption = caption.indexOf(':') === -1 && caption !== ''
           ? caption + ':'
           : caption;                 
  return (
     <div style={STYLE.rowDiv}>
        <span style={STYLE.labelSpan}>
           {_caption}
        </span>
        <InputSelect
           width="250"
           {...rest}
        />
    </div>
  );
};


export default RowInputSelect
