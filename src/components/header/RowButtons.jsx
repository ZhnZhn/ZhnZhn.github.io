import React from 'react'

import FlatButton from '../zhn-m/FlatButton'

const S = {
  ROW: {
     cursor: 'default',
     float: 'right',
     marginTop: '8px',
     marginBottom: '10px',
     marginRight: '4px'
  }
};

const RowButtons = ({ children, btStyle, onClose }) =>
 <div style={S.ROW}>
   {children}
   <FlatButton
     rootStyle={btStyle}
     caption="Close"
     onClick={onClose}
   />
 </div>

export default RowButtons 
