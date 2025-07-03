import { bindTo } from '../uiApi';
import { crMenuItemRole } from '../a11yFn';

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
}
, EMPTY_ITEM_CAPTION = 'Not Found';

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
     : null;

 return (
   <div
     {...crMenuItemRole(() => onClick(item), "0", !0)}
     className={className}
     style={S_ITEM_DIV}
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
