import {
  bindTo,
  useCallback
} from '../uiApi';

import { isKeyEnterOrBlank } from '../hooks/fUseKey';

import { BtSvgClose } from '../zhn/BtSvgX';
import DivEllipsis from '../zhn/DivEllipsis';

const S_ITEM_DIV = {
  position: 'relative',
  padding: '5px 40px 5px 0'
}
, S_CAPTION = {
  width: '100%',
  maxWidth: 250,
  height: 28,
  verticalAlign: 'middle',
}
, S_SVG_CLOSE = {
  top: 8
};

const EMPTY_ITEM_CAPTION = 'Not Found';

const WatchItem = ({
  item,
  className,
  onClick,
  onClose,

  isDraggable,
  dndHandlers,
  option
}) => {
  const {
    caption=EMPTY_ITEM_CAPTION
  } = item || {}
  , _btClose = isDraggable
     ? (<BtSvgClose
         style={S_SVG_CLOSE}
         onClick={bindTo(onClose, option)}
       />)
     : null
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClick = useCallback(() => onClick(item), [item])
  //onClick
  /*eslint-enable react-hooks/exhaustive-deps */
  , _hKeyUp = useCallback(evt => {
       if (isKeyEnterOrBlank(evt)) {
         _hClick()
       }
  }, [_hClick])

 return (
     <div
       role="menuitem"
       tabIndex="0"
       className={className}
       style={S_ITEM_DIV}
       onClick={_hClick}
       onKeyUp={_hKeyUp}
       {...dndHandlers}
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
