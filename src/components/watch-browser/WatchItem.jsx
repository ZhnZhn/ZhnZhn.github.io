
import React, { useCallback } from 'react';

import isKeyEnter from '../zhn/isKeyEnter'

import SvgClose from '../zhn/SvgClose';

const S = {
  ITEM_DIV : {
    position: 'relative',
    paddingRight: 40,
    paddingTop: 5,
    paddingBottom: 5
  },
  ITEM_SPAN : {
    display: 'inline-block',
    width: '100%',
    maxWidth: 250,
    height: 28,
    verticalAlign : 'middle',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  SVG_CLOSE : {
    position: 'absolute',
    top: 10,
    right: 0
  }
};


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
               style={S.SVG_CLOSE}
               onClose={onClose.bind(null, option)}
             />
            )
          : null
     , _hClick = useCallback(() => {
        //onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.LOAD_ITEM, item)}
        onClick(item)
     }, [item])
     , _hKeyUp = useCallback((evt) => {
       if (isKeyEnter(evt)) {
         onClick(item)
       }
     }, [item])
     , _dndOptions = isModeEdit
         ? {
           draggable: true,
           onDragStart: onDragStart.bind(null, option),
           onDrop: onDrop.bind(null, option),
           onDragOver, onDragEnter, onDragLeave
         } : void 0;
return (
     <div
       role="menuitem"
       tabIndex="0"
       className={className}
       style={S.ITEM_DIV}
       onClick={_hClick}
       {..._dndOptions}
       onKeyUp={_hKeyUp}
     >
       <span style={S.ITEM_SPAN}>
         {caption}
       </span>
       {_btClose}
    </div>
  );
};

export default WatchItem
