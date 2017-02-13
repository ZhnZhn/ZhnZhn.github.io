import React from 'react';

import ZhSelect from '../ZhSelect';
import DialogStyles from '../styles/DialogStyles';

const styles = DialogStyles;

const RowInputSelect = ({ caption='', ...rest }) => (
   <div style={styles.rowDiv}>
      <span style={styles.labelSpan}>
         {caption}
      </span>
      <ZhSelect
         width="250"
         {...rest}
      />
  </div>
);


export default RowInputSelect
