import { useRef, useEffect } from 'react';
//import PropTypes from 'prop-types'
import useForceUpdate from '../hooks/useForceUpdate';

const CL = {
  INIT: 'modal-root',
  SHOWING: 'modal-root show-modal',
  HIDING: 'modal-root hide-modal'
};

const S = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  },
  HIDE_BACKGROUND: {
    backgroundColor: 'rgba(0,0,0, 0)'
  }
};

const ModalDialogContainer = ({
  isShow,
  timeout=450,
  children,
  onClose
}) => {
  const _refWasClosing = useRef(true)
  , forceUpdate = useForceUpdate();

  useEffect(() => {
    const { current } = _refWasClosing;
    if (current) {
      setTimeout(forceUpdate, timeout)
    }
  })

  let _className, _style;
  if (_refWasClosing.current){
     _className = CL.INIT;
     _style = S.HIDE;
     _refWasClosing.current = false;
  } else {
    _className = isShow ? CL.SHOWING : CL.HIDING;
    _style = isShow ? S.SHOW : S.HIDE_BACKGROUND;
    if (!isShow){
      _refWasClosing.current = true;
    }
  }

  return (
    <div
      role="presentation"
      className={_className}
      style={_style}
      onClick={onClose}
    >
      {children}
    </div>
  );
}

/*
ModalDialogContainer.propTypes = {
  isShow  : PropTypes.bool,
  timeout : PropTypes.number,
  onClose : PropTypes.func
}
*/

export default ModalDialogContainer
