import React from 'react';

import DialogStyles from '../styles/DialogStyles';
const styles = DialogStyles;

const Row = ({ style, children }) => (
  <div style={Object.assign({},styles.rowDiv, style)}>
    {children}
  </div>
);

export default Row
