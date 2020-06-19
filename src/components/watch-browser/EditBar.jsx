import React from 'react';

import ButtonCircle from '../zhn/ButtonCircle';

const CL_BT = "bt__watch__bar";

const S = {
  ROOT: {
    marginBottom: 10
  },
  BT_LIST : {
    marginLeft: 20
  }
};

const EditBar = ({
  isShow,
  onClickGroup,
  onClickList
}) => isShow
   ? (<div style={S.ROOT}>
         <ButtonCircle
           caption="GROUP"
           isOverwriteClass={true}
           className={CL_BT}
           onClick={onClickGroup}
        />
        <ButtonCircle
           caption="LIST"
           isOverwriteClass={true}
           className={CL_BT}
           style={S.BT_LIST}
           onClick={onClickList}
        />
     </div>)
   : null;


export default EditBar
