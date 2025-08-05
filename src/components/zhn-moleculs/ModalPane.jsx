import { crPresentationRole } from '../a11yFn';
import {
  CL_POPUP_MENU,
  crCn,
  crContainerCn
} from '../styleFn';

import useClickOutside from '../hooks/useClickOutside';
import { useKeyEscape } from '../hooks/fUseKey';

const CL_MODAL_PANE = crContainerCn(CL_POPUP_MENU);

const ModalPane = ({
  isShow,
  className,
  style,
  children,
  onClose
}) => {
  const _refNode = useClickOutside(isShow, onClose)
  , _hKeyEscape = useKeyEscape(onClose);
  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return (
    <div
       {...crPresentationRole(isShow)}
       ref={_refNode}
       className={crCn(CL_MODAL_PANE, className)}
       style={style}
       onKeyDown={isShow ? _hKeyEscape : void 0}
    >
      {children}
    </div>
  );
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
};

export default ModalPane
