import {
  CL_POPUP_MENU,
  crCn,
  crContainerCn
} from '../styleFn';

import useClickOutside from '../hooks/useClickOutside';
import { useKeyEscape } from '../hooks/fUseKey';
import { useFocusPrevElement } from '../hooks/useFocus';

const CL_MODAL_PANE = crContainerCn(CL_POPUP_MENU);

const ModalPane = ({
  isShow,
  className,
  style,
  children,
  onClose,
  ...restProps
}) => {
  const _refNode = useClickOutside(isShow, onClose)
  , _hKeyEscape = useKeyEscape(onClose);
  useFocusPrevElement(isShow)
  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return (
    <div
       {...restProps}
       ref={_refNode}
       className={crCn(CL_MODAL_PANE, className)}
       style={style}
       hidden={!isShow}
       onKeyDown={isShow ? _hKeyEscape : void 0}
    >
      {children}
    </div>
  );
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
};

export default ModalPane
