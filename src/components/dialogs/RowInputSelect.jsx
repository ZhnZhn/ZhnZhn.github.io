import React from 'react';

import InputSelect from '../zhn-select/InputSelect';
import STYLE from '../styles/DialogStyles';

const RowInputSelect = ({ caption='', ...rest }) => (
   <div style={STYLE.rowDiv}>
      <span style={STYLE.labelSpan}>
         {caption}
      </span>
      <InputSelect
         width="250"
         {...rest}
      />
  </div>
);


export default RowInputSelect
