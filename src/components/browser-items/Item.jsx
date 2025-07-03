import { crMenuItemRole } from '../a11yFn';
import DivEllipsis from '../zhn/DivEllipsis';

const S_ITEM = {
   position: 'relative',
   minWidth: 350,
   padding: '5px 10px 5px 0',
   lineHeight: 1.4
}
, S_CAPTION = {
   verticalAlign: 'middle',
   width: '100%'
};

const Item = ({
   caption,
   className,
   item,
   onClickItem,
   children
}) => (
  <div
    {...crMenuItemRole(() => onClickItem(item), "0")}
    className={className}
    style={S_ITEM}
  >
    <DivEllipsis
      style={S_CAPTION}
      text={caption}
    />
    {children}
  </div>
);

export default Item
