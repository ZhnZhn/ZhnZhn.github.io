
import React from 'react';

import SvgClose from '../zhn/SvgClose';

const STYLE = {
  ITEM_DIV : {
    position: 'relative',
    paddingRight: '40px',
    lineHeight : 1.4,
    paddingTop : '5px',
    paddingBottom: '5px'
  },
  ITEM_SPAN : {
    display: 'inline-block',
    verticalAlign : 'middle',
    width: '100%',
    maxWidth: '250px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },

  SVG_CLOSE : {
    position: 'absolute',
    right: 0
  }

}


const WatchItem = (props) => {
  const {
           item, className, isModeEdit, option,
           onClick, onClose,
           onDragStart, onDragEnter, onDragOver, onDragLeave, onDrop
         } = props
      , { caption } = item
      , _btClose = isModeEdit
          ? (
             <SvgClose
               style={STYLE.SVG_CLOSE}
               onClose={onClose.bind(null, option)}
             />
            )
          : null;
return (
     <div
       className={className}
       style={STYLE.ITEM_DIV}
       onClick={onClick.bind(null, item)}
       //onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.LOAD_ITEM, item)}
       draggable={isModeEdit}
       onDragStart={isModeEdit ? onDragStart.bind(null, option) : void 0}
       onDrop={isModeEdit ? onDrop.bind(null, option) : void 0}
       onDragOver={isModeEdit ? onDragOver : void 0}
       onDragEnter={isModeEdit ? onDragEnter : void 0}
       onDragLeave={isModeEdit ? onDragLeave: void 0}
     >
       <span style={STYLE.ITEM_SPAN}>
         {caption}
       </span>
       {_btClose}
    </div>
  );
};

export default WatchItem
