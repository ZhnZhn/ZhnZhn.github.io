import React from 'react';

import ButtonCircle from '../zhn/ButtonCircle';

const CLASS_FOR_BT = "bt__watch__bar";

const S = {
  ROOT: {
    marginBottom: '10px'
  },
  BT_LIST : {
    marginLeft: '20px'
  }
}

const EditBar = ({ isShow, onClickGroup, onClickList }) => {
  if (isShow) {
    return (
      <div style={S.ROOT}>
         <ButtonCircle
           caption="GROUP"
           className={CLASS_FOR_BT}
           isWithoutDefault={true}
           onClick={onClickGroup}
        />
        <ButtonCircle
           caption="LIST"
           className={CLASS_FOR_BT}
           isWithoutDefault={true}
           style={S.BT_LIST}
           onClick={onClickList}
        />
      </div>
    );
  } else {
    return null;
  }
}

export default EditBar
