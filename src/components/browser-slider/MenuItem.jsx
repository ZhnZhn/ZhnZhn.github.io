import { useKeyEnter }  from '../hooks/fUseKey';

import { getMenuItemStyle } from './Style';

const MenuItem = ({
  innerRef,
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
  ] = getMenuItemStyle(type)
  , _hKeyDown = useKeyEnter(onClick, [onClick]);

  return (
    <div
      ref={innerRef}
      className={_className}
      style={_style}
      tabIndex="0"
      role="menuitem"
      onClick={onClick}
      onKeyDown={_hKeyDown}
   >
      {text}
    </div>
  );
}

export default MenuItem
