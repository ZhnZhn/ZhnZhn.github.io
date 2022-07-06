import {
  useCallback
} from 'react';

import isKeyEnter from '../zhn/isKeyEnter'

import SvgClose from '../zhn/SvgClose';
import DivEllipsis from '../zhn/DivEllipsis';

const S_ITEM_DIV = {
  position: 'relative',
  paddingRight: 40,
  paddingTop: 5,
  paddingBottom: 5
}
, S_CAPTION = {
  width: '100%',
  maxWidth: 250,
  height: 28,
  verticalAlign: 'middle',
}
, S_SVG_CLOSE = {
  position: 'absolute',
  top: 10,
  right: 0
};

const EMPTY_ITEM_CAPTION = 'Not Found';

//onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.LOAD_ITEM, item)}
const WatchItem = ({
  item,
  className,
  isModeEdit,
  option,
  onClick,
  onClose,

  onDragStart,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop
}) => {
  const { caption=EMPTY_ITEM_CAPTION } = item || {}
  , _btClose = isModeEdit
     ? (<SvgClose
         style={S_SVG_CLOSE}
         onClose={onClose.bind(null, option)}
       />)
     : null
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClick = useCallback(() => onClick(item), [item])
  //onClick
  /*eslint-enable react-hooks/exhaustive-deps */
  , _hKeyUp = useCallback(evt => {
       if (isKeyEnter(evt)) {
         _hClick()
       }
  }, [_hClick])
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
       style={S_ITEM_DIV}
       onClick={_hClick}
       {..._dndOptions}
       onKeyUp={_hKeyUp}
     >
       <DivEllipsis
         style={S_CAPTION}
         text={caption}
       />
       {_btClose}
    </div>
  );
};

export default WatchItem
