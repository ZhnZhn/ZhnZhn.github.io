import React from 'react';

import ButtonCircle from '../zhn/ButtonCircle';

const CL_BT = "bt__watch__bar";

const S = {
  ROOT: {
    marginBottom: '10px'
  },
  BT_LIST : {
    marginLeft: '20px'
  }
};

const EditBar = ({ isShow, onClickGroup, onClickList }) => {
  if (isShow) {
    return (
      <div style={S.ROOT}>
         <ButtonCircle
           caption="GROUP"
           isWithoutDefault={true}
           className={CL_BT}
           onClick={onClickGroup}
        />
        <ButtonCircle
           caption="LIST"
           isWithoutDefault={true}
           className={CL_BT}
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
