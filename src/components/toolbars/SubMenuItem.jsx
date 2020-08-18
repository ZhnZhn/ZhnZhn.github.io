import React from 'react';
//import PropTypes from "prop-types";

import memoEqual from '../hoc/memoEqual'
import useToggle from '../hooks/useToggle'

const CL = "bt-sub-item";

const S = {
  ACTIVE: {
    fontWeight: 'bold'
  }
};

const _isFn = fn => typeof fn === 'function';

const SubMenuItem = memoEqual(({
  caption,
  initialIsActive=false,
  onClick,
  onClose
}) => {
  const [isActive, toggleIsAcive] = useToggle(initialIsActive)
  , _hClick = () => {
    onClick()
    if (_isFn(onClose)) {
      onClose()
    } else {
      toggleIsAcive()
    }
  };

  if (!_isFn(onClick)){
    return null;
  }
  const _style = isActive ? S.ACTIVE : null;

  return (
    <button
      className={CL}
      style={_style}
      onClick={_hClick}
    >
      {caption}
    </button>
  );
})

/*
SubMenuItem.propTypes = {
  caption: PropTypes.string,
  initialIsActive: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default SubMenuItem
