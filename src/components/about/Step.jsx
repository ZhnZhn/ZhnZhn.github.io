import React from 'react';

const S = {
  STEP : {
    display : 'inline-block',
    color: '#80c040',
    border : '2px solid #80c040',
    borderRadius : '50%',
    width : '22px',
    height : '22px',
    textAlign: 'center'
  }
}

const Step = ({ step='0' }) => (
  <span style={S.STEP}>
      {step}
  </span>
);

export default Step
