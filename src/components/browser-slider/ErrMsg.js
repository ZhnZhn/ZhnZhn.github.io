import React from 'react'

import S from './Style'

const ErrMsg = ({ errMsg }) => {  
  if (!errMsg) return null;
  return (
    <div style={S.MSG_ERR}>
      {errMsg}
    </div>
  );
}

export default ErrMsg
