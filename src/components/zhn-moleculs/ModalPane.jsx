//import PropTypes from 'prop-types'

import useTheme from '../hooks/useTheme';
import useClickOutside from '../hooks/useClickOutside';
import useKeyEscape from '../hooks/useKeyEscape';

const TH_ID = 'MODAL_PANE';

const ModalPane = ({
  isShow,
  style,
  children,
  onClose
}) => {
  const _refNode = useClickOutside(isShow, onClose)
  , _hKeyEscape = useKeyEscape(onClose)
  , _hKeyDown = isShow ? _hKeyEscape : void 0
  , TS = useTheme(TH_ID);
  return (
    <div
       role="presentation"
       ref={_refNode}
       style={{...style, ...TS.ROOT}}
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
