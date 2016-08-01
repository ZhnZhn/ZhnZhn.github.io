import React from 'react';

const STYLES = {
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

const Step = (props) => {
    return (
      <span style={STYLES.STEP}>
         {props.step}
      </span>
    );
};

export default Step
