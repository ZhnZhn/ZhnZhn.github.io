import { crMenuItemRole } from '../a11yFn';
import { getMenuItemStyle } from './Style';

const MenuItem = ({
  refEl,
  item,
  onClick
}) => {
  const {
    text,
    type
  } = item
  , [
    _className,
    _style
  ] = getMenuItemStyle(type);

  return (
    <div
      {...crMenuItemRole(onClick, "0")}
      ref={refEl}
      className={_className}
      style={_style}
   >
      {text}
    </div>
  );
};

export default MenuItem
