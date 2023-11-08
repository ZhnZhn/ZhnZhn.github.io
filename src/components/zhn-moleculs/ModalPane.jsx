//import PropTypes from 'prop-types'
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
  , _hKeyEscape = useKeyEscape(onClose)
  , _hKeyDown = isShow ? _hKeyEscape : void 0
  return (
    <div
       role="presentation"
       aria-hidden={!isShow}
       ref={_refNode}
       className={CL_MODAL_PANE}
       style={style}
       onKeyDown={_hKeyDown}
    >
      {children}
    </div>
  );
}

/*
ModalPane.propTypes = {
 className: PropTypes.string,
 style: PropTypes.object,
 isShow: PropTypes.bool,
 onClose: PropTypes.func
}
*/

export default ModalPane
