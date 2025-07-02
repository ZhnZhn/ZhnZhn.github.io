import { fOnKeyEnter } from '../hooks/fUseKey';

const MenuAriaItem = ({
  refEl,
  className,
  style,
  isInitial,
  children,
  onClick
}) => (
  <div
    ref={refEl}
    className={className}
    style={style}
    role="menuitem"
    tabIndex="0"
    onClick={onClick}
    onKeyDown={fOnKeyEnter(onClick)}
  >
    {children}
  </div>
);

export default MenuAriaItem
