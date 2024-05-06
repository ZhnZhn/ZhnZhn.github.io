import { useKeyEnter } from '../hooks/fUseKey';

const MenuAriaItem = ({
  refEl,
  className,
  style,
  children,
  onClick
}) => {
  const _hKeyDown = useKeyEnter(onClick);

  return (
    <div
      ref={refEl}
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
};

export default MenuAriaItem
