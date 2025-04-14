import {
  isBool
} from '../../utils/isTypeFn';

import {
  useState,
  renderChildren
} from '../uiApi';
import {
  fOnKeyEnter
} from '../hooks/fUseKey';

const MenuAriaItem = ({
  refEl,
  className,
  style,
  isInitial,
  children,
  onClick
}) => {
  const [is, setIs] = useState(isInitial)
  , _onClick = isBool(isInitial)
    ? () => { onClick(); setIs(is => !is); }
    : onClick
  , _hKeyDown = fOnKeyEnter(_onClick);

  return (
    <div
      ref={refEl}
      className={className}
      style={style}
      role="menuitem"
      tabIndex="0"
      onClick={_onClick}
      onKeyDown={_hKeyDown}
    >
      {renderChildren(children, is)}
    </div>
  );
};

export default MenuAriaItem
