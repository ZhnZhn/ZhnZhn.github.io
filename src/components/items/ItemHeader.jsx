import { crElementCn } from '../styleFn';

import Button from '../zhn/Button';
import { BtSvgClose } from '../zhn/BtSvgX';
import {
  CL_HEADER_CAPTION,
  S_HEADER_CAPTION_OPEN,
  S_HEADER_CAPTION_CLOSE,
  S_BT_SVG_CLOSE  
} from './Item.Style';

const CL_ITEM_HEADER = crElementCn()
, S_ROOT = {
  position: 'relative',
  height: 'auto',
  width: '100%',
  padding: '6px 42px 6px 10px',
  borderTopRightRadius: 2,
  borderBottomRightRadius: 2
}
, S_CAPTION = {
  width: '75%',
  padding: '4px 2px 2px 0',
}
, MAX_LENGTH = 45
, _crTitle = (
  title,
  caption
) => title || caption.length > MAX_LENGTH
  ? caption
  : void 0;

const ItemHeader = ({
  isOpen,
  style,
  captionStyle,
  caption='',
  title,
  children,
  onClick,
  onClose
}) => {
  const _title = _crTitle(title, caption)
  , _captionStyle = isOpen
      ? S_HEADER_CAPTION_OPEN
      : S_HEADER_CAPTION_CLOSE;
  return (
    <div
      className={CL_ITEM_HEADER}
      style={{...S_ROOT, ...style}}
    >
      <Button
         className={CL_HEADER_CAPTION}
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
         style={S_BT_SVG_CLOSE}
         onClick={onClose}
       />
    </div>
  );
};

export default ItemHeader
