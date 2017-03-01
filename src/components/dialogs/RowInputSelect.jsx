import React from 'react';

import InputSelect from '../zhn/InputSelect';
import DialogStyles from '../styles/DialogStyles';

const styles = DialogStyles;

const RowInputSelect = ({ caption='', ...rest }) => (
   <div style={styles.rowDiv}>
      <span style={styles.labelSpan}>
         {caption}
      </span>
      <InputSelect
         width="250"
         {...rest}
      />
  </div>
);


export default RowInputSelect
