import { useState } from '../uiApi';

import useListen from '../hooks/useListen';

const S_LABEL = {
  display: 'inline-block',
  color: '#2f7ed8',
  paddingRight: 8,
  fontSize: '16px',
  fontWeight: 'bold'
};

const LimitRemainingLabel = () => {
  const [value, setValue] = useState('');

  useListen(v => {    
    if (v != null) {
      setValue(v)
    }
  }, 'listenLimitRemaining')

  return (
    <span style={S_LABEL}>
      {value}
    </span>
  );
};

export default LimitRemainingLabel
