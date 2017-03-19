import React, { PropTypes } from 'react'

const SHOW_POPUP = 'show-popup'
const S = {
  SHOW : {
    display: 'block'
  },
  HIDE : {
    display : 'none'
  }
};

const ShowHide = (props) => {
    const {isShow, className, style, children} = props
        , _styleShow = isShow ? S.SHOW : S.HIDE
        , _classShow = isShow ? SHOW_POPUP : ''
        , _className = (className)
              ? `${className} ${_classShow}`
              : (_classShow !== '')
                   ? _classShow
                   : undefined;
    return (
      <div
        className={_className}
        style={Object.assign({}, style, _styleShow)}
      >
        {children}
      </div>
    );
 }

ShowHide.propTypes = {
  isShow: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType[
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]
}

export default ShowHide
