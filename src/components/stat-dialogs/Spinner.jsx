import { useState, useEffect } from 'react';

import { LOADING, FAILED } from './SpinnerStatus';

const S_LOADING = {
  position: 'absolute',
  top: 80,
  left: '45%',
  zIndex: 10,
  display: 'block',
  width: 32,
  height: 32,
  opacity: 1,
  transition: 'opacity 800ms ease-out'
}, S_FAILED = {
  borderColor: '#f44336',
  animation: 'none'
}, S_LOADED = {
  opacity: 0,
};

const _useIsHide = (status) => {
  const [isHide, setIsHide] = useState(false);
  useEffect(() => {
    if (!status) {
      setTimeout(() => setIsHide(true), 1000)
    }
  }, [status])
  return isHide;
};

const Spinner = ({
  style,
  status
}) => {
  const isHide = _useIsHide(status)
  , _style = status === LOADING
     ? S_LOADING
     : status === FAILED
         ? S_FAILED
         : S_LOADED;

  return isHide ? null : (
   <span
      style={{...S_LOADING, ...style, ..._style}}
      data-loader="circle"
    />
  );
}

export default Spinner
