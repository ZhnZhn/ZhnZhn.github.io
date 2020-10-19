import { useState } from 'react'

import useListen from '../hooks/useListen'

const S = {
  LABEL: {
    display: 'inline-block',
    color: '#2f7ed8',
    paddingRight: 8,
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

const LimitRemainingLabel = ({ store, style }) => {
  const [value, setValue] = useState('');

  useListen(store, (v) => {
    if (v != null) {
      setValue(v)
    }
  }, 'listenLimitRemaining')

  return (
    <span style={{...S.LABEL, ...style}}>
      {value}
    </span>
  );
}

export default LimitRemainingLabel
