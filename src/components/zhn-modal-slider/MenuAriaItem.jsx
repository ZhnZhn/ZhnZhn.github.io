import { forwardRef } from 'react';

import useKeyEnter from '../hooks/useKeyEnter';

const MenuAriaItem = forwardRef(({
  children,
  onClick,
  onReg,
  ...rest
}, ref) => {
  const _hKeyDown = useKeyEnter(onClick);

  return (
    <div
      {...rest}
      ref={ref}
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
