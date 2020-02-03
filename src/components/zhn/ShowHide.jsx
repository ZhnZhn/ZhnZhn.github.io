import React from 'react';
//import PropTypes from "prop-types";

const CL_SHOW_POPUP = 'show-popup';
const S = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  }
};

const ShowHide = ({
  isShow, withoutAnimation,
  className, style,
  children
}) => {
    const _styleShow = isShow ? S.SHOW : S.HIDE
    , _classShow = isShow
         ? withoutAnimation ? '' : CL_SHOW_POPUP
         : ''
    , _className = className
        ? `${className} ${_classShow}`
        : _classShow || void 0;
    return (
      <div
        className={_className}
        style={{ ...style, ..._styleShow}}
      >
        {children}
      </div>
    );
 }

/*
ShowHide.propTypes = {
  isShow: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType[
    (PropTypes.arrayOf(PropTypes.node), PropTypes.node)
  ]
}
*/

export default ShowHide
