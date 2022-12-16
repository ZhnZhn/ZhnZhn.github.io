import { forwardRef } from '../uiApi';

import useKeyEnter from '../hooks/useKeyEnter';

const MenuAriaItem = forwardRef(({
  className,
  style,
  children,
  onClick
}, ref) => {
  const _hKeyDown = useKeyEnter(onClick);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      role="menuitem"
      tabIndex="0"
      onClick={onClick}
      onKeyDown={_hKeyDown}
    >
      {children}
    </div>
  );
})

export default MenuAriaItem
