import React, { useRef, useCallback, useEffect } from 'react'
//import PropTypes from 'prop-types'

import useTheme from '../hooks/useTheme'

const TH_ID = 'MODAL_PANE';

const _removeClickListener = (listener, ref) => {
  if (ref.current) {
   document.removeEventListener('click', listener, true);
   ref.current = null
  }
};

/*eslint-disable react-hooks/exhaustive-deps */
const ModalPane = ({
  isShow, style,
  children,
  onClose
}) => {
  const _refNode = useRef(null)
  , _refIs = useRef(null)
  , _hClickOutside = useCallback(event => {
      if ( _refNode?.current?.contains
        && !_refNode.current.contains(event.target)
      ){
        event.stopPropagation()
        onClose(event)
      }
  }, []);

  useEffect(() => {
    if (isShow && !_refIs.current) {
      document.addEventListener('click', _hClickOutside, true)
      _refIs.current = true
    } else if (!isShow) {
      _removeClickListener(_hClickOutside, _refIs)
    }
  })
  useEffect(() => {
    return () => _removeClickListener(_hClickOutside, _refIs)
  }, [])
/*eslint-enable react-hooks/exhaustive-deps */

  const TS = useTheme(TH_ID);
  return (
    <div
       ref={_refNode}
       style={{...style, ...TS.ROOT}}
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
