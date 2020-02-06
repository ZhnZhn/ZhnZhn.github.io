import React, { useState, useCallback } from 'react'

import ButtonCircle from '../zhn/ButtonCircle'

/*
const S = {
  BT: {
    color: '#7cb5ec',
    borderColor: '#7cb5ec'
  }
};
*/

const BtCounter = ({
  style,
  title,
  initialValue=1,
  maxValue=4,
  onSetValue=()=>{}
}) => {
  const [value, setValue] = useState(initialValue)
  , _onClick = useCallback(() => {
     if (value < maxValue) {
       onSetValue(value+1)
       setValue(v => v+1)
     } else {
       onSetValue(1)
       setValue(1)
     }
   }, [value, maxValue]);
  return (
    <ButtonCircle
      style={style}
      title={title}
      caption={value}
      onClick={_onClick}
    />
  );
}

export default BtCounter
