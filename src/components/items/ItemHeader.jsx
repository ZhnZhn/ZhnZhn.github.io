import { crElementCn } from '../styleFn';

import Button from '../zhn/Button';
import { BtSvgClose } from '../zhn/BtSvgX';

const CL_ITEM_HEADER = crElementCn()
, CL_CAPTION = "not-selected text-clip bt-left bt"
, S_ROOT = {
  position: 'relative',
  height: 'auto',
  width: '100%',
  padding: '6px 42px 6px 10px',
  borderTopRightRadius: 2,
  borderBottomRightRadius: 2
}, S_CAPTION = {
  width: '75%',
  padding: '4px 2px 2px 0',
}, S_OPEN = { color: '#a487d4' }
, S_CLOSE = { color: 'gray' }
, S_SVG_CLOSE = {
  position: 'absolute',
  right: 0,
  top: 4
}
, MAX_LENGTH = 45
, _crTitle = (title, caption) => title
     || caption.length > MAX_LENGTH
   ? caption
   : void 0;

function ItemHeader({
  isOpen,
  style,
  captionStyle,
  caption='',
  title,
  children,
  onClick,
  onClose
}){
  const _title = _crTitle(title, caption)
  , _captionStyle = isOpen
      ? S_OPEN
      : S_CLOSE;
  return (
    <div
      className={CL_ITEM_HEADER}
      style={{...S_ROOT, ...style}}
    >
      <Button
         className={CL_CAPTION}
         style={{
           ...S_CAPTION,
           ...captionStyle,
           ..._captionStyle
         }}
         title={_title}
         onClick={onClick}
      >
         {caption}
      </Button>
      {children}
      <BtSvgClose
         style={S_SVG_CLOSE}
         onClick={onClose}
       />
    </div>
  );
}

export default ItemHeader
