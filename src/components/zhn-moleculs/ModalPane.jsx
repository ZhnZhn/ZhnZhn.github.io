import { crPresentationRole } from '../a11yFn';
import { crContainerCn } from '../styleFn';

import useClickOutside from '../hooks/useClickOutside';
import { useKeyEscape } from '../hooks/fUseKey';

const CL_MODAL_PANE = crContainerCn();

const ModalPane = ({
  isShow,
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
       className={CL_MODAL_PANE}
       style={style}
       onKeyDown={isShow ? _hKeyEscape : void 0}
    >
      {children}
    </div>
  );
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
};

export default ModalPane
