import React from 'react';

const S = {
  LABEL : {
    display: 'inline-block',
    color: '#9E9E9E',
    backgroundColor: 'transparent',
    marginLeft: '16px',
    marginRight: '16px'
  }
}

const LabelNew = () => (
  <span style={S.LABEL}>
     New
  </span>
);

export default LabelNew
